import { AppText } from '@/components/ui/AppText';
import { AppScreen } from '@/components/layout/AppScreen';

export default function TransactionsPlaceholderScreen() {
  return (
    <AppScreen>
      <AppText fontSize="$xl" fontWeight="$bold" accessibilityRole="header">
        Transactions
      </AppText>
      <AppText mt="$2" color="$textLight600">
        Placeholder — business flows arrive in a later feature.
      </AppText>
    </AppScreen>
  );
}
