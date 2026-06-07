import { ScrollView, View } from 'react-native';

import { DashboardSummary } from '../components/dashboard-summary';
import { mockPopulatedDashboard } from '../mocks/dashboard-data';

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <View className="gap-8 px-4 py-12 md:px-6 lg:px-0">
        <DashboardSummary data={mockPopulatedDashboard} />
      </View>
    </ScrollView>
  );
}
