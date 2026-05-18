interface PayoutFailedProps {
  transactionId?: string;
}

export default function PayoutFailed({ transactionId }: PayoutFailedProps) {
  return (
    <div>
      <h1>Payout failed</h1>
      <p>Something went wrong when processing your reward.</p>
      <p>Please contact a staff member for help.</p>
      {transactionId && (
        <p>Transaction ID: <strong>{transactionId}</strong></p>
      )}
    </div>
  );
}