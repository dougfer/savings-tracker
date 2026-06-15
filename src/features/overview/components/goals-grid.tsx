import { Pressable, View } from 'react-native';

import { router } from 'expo-router';

import type { Goal, GoalSize } from '../types/goal';

import { GoalCard } from './goal-card';

type GoalsGridProps = {
  goals: Goal[];
};

function NavigableGoalCard({ goal, size }: { goal: Goal; size: GoalSize }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/goals/[id]', params: { id: goal.id } })}
      accessibilityRole="link"
      accessibilityLabel={`View details for ${goal.name || 'Untitled goal'}`}
    >
      <GoalCard goal={goal} size={size} />
    </Pressable>
  );
}

function chunkGoalsForDesktop(goals: Goal[]) {
  const rows: {
    leftWide: Goal;
    leftDefaults: Goal[];
    rightTall: Goal | null;
    mirrored: boolean;
  }[] = [];

  for (let i = 0; i < goals.length; i += 4) {
    const chunk = goals.slice(i, Math.min(i + 4, goals.length));
    const mirrored = (i / 4) % 2 === 1;

    if (chunk.length >= 3) {
      rows.push({
        leftWide: chunk[0],
        leftDefaults: [chunk[1], chunk.length >= 3 ? chunk[2] : null].filter(Boolean) as Goal[],
        rightTall: chunk.length >= 4 ? chunk[3] : null,
        mirrored,
      });
    } else if (chunk.length === 2) {
      rows.push({
        leftWide: chunk[0],
        leftDefaults: [],
        rightTall: chunk[1],
        mirrored: false,
      });
    } else {
      rows.push({
        leftWide: chunk[0],
        leftDefaults: [],
        rightTall: null,
        mirrored: false,
      });
    }
  }

  return rows;
}

function DesktopGrid({ goals }: GoalsGridProps) {
  const rows = chunkGoalsForDesktop(goals);

  return (
    <View className="hidden lg:flex lg:flex-col lg:gap-6">
      {rows.map((row) =>
        row.mirrored ? (
          <View key={row.leftWide.id} className="flex-row gap-6">
            <View className="flex-1">
              {row.rightTall && <NavigableGoalCard goal={row.rightTall} size="tall" />}
            </View>
            <View className="flex-[2] max-w-[838px] gap-6">
              <NavigableGoalCard goal={row.leftWide} size="wide" />
              {row.leftDefaults.length > 0 && (
                <View className="flex-row gap-6">
                  {row.leftDefaults.map((goal) => (
                    <View key={goal.id} className="flex-1">
                      <NavigableGoalCard goal={goal} size="default" />
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ) : (
          <View key={row.leftWide.id} className="flex-row gap-6">
            <View className="flex-[2] max-w-[838px] gap-6">
              <NavigableGoalCard goal={row.leftWide} size="wide" />
              {row.leftDefaults.length > 0 && (
                <View className="flex-row gap-6">
                  {row.leftDefaults.map((goal) => (
                    <View key={goal.id} className="flex-1">
                      <NavigableGoalCard goal={goal} size="default" />
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View className="flex-1">
              {row.rightTall && <NavigableGoalCard goal={row.rightTall} size="tall" />}
            </View>
          </View>
        ),
      )}
    </View>
  );
}

function TabletGrid({ goals }: GoalsGridProps) {
  const rows: Goal[][] = [];
  for (let i = 0; i < goals.length; i += 3) {
    rows.push(goals.slice(i, Math.min(i + 3, goals.length)));
  }

  return (
    <View className="hidden md:flex md:flex-col lg:hidden gap-6">
      {rows.map((row) => (
        <View key={row[0].id} className="flex-col gap-6">
          {row.length > 0 && (
            <NavigableGoalCard goal={row[0]} size="wide" />
          )}
          {row.length >= 3 && (
            <View className="flex-row gap-6">
              <View className="flex-1">
                <NavigableGoalCard goal={row[1]} size="default" />
              </View>
              <View className="flex-1">
                <NavigableGoalCard goal={row[2]} size="default" />
              </View>
            </View>
          )}
          {row.length === 2 && (
            <NavigableGoalCard goal={row[1]} size="default" />
          )}
        </View>
      ))}
    </View>
  );
}

function MobileGrid({ goals }: GoalsGridProps) {
  return (
    <View className="flex md:hidden flex-col gap-6">
      {goals.map((goal, index) => (
        <NavigableGoalCard
          key={goal.id}
          goal={goal}
          size={index % 4 === 0 ? 'wide' : 'default'}
        />
      ))}
    </View>
  );
}

export function GoalsGrid({ goals }: GoalsGridProps) {
  return (
    <View>
      <DesktopGrid goals={goals} />
      <TabletGrid goals={goals} />
      <MobileGrid goals={goals} />
    </View>
  );
}
