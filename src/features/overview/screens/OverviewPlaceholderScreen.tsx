import { Link } from 'expo-router';
import { Box, Button, ButtonText } from '@/components/ui';
import { AppText } from '@/components/ui/AppText';
import { AppScreen } from '@/components/layout/AppScreen';
import { OverviewHint } from '@/features/overview/components/OverviewHint';

export default function OverviewPlaceholderScreen() {
  return (
    <AppScreen>
      <AppText fontSize="$xl" fontWeight="$bold" mb="$4" accessibilityRole="header">
        Savings Tracker — foundation
      </AppText>
      <AppText mb="$4" color="$textLight600">
        Structural shell only. Pick an area to open its placeholder route.
      </AppText>
      <OverviewHint />
      <Box gap="$3">
        <Link href="/transactions" asChild>
          <Button accessibilityLabel="Open transactions placeholder">
            <ButtonText>Transactions</ButtonText>
          </Button>
        </Link>
        <Link href="/budgets" asChild>
          <Button accessibilityLabel="Open budgets placeholder">
            <ButtonText>Budgets</ButtonText>
          </Button>
        </Link>
        <Link href="/pots" asChild>
          <Button accessibilityLabel="Open pots placeholder">
            <ButtonText>Pots</ButtonText>
          </Button>
        </Link>
        <Link href="/recurring-bills" asChild>
          <Button accessibilityLabel="Open recurring bills placeholder">
            <ButtonText>Recurring bills</ButtonText>
          </Button>
        </Link>
      </Box>
    </AppScreen>
  );
}
