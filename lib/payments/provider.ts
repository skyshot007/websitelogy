/**
 * Payments adapter — Phase 2 scaffold.
 *
 * Phase 2 will wire Razorpay (primary) and optionally Stripe behind this
 * interface. Phase 1.5 bookings can ship without payments (pay-on-call).
 */

export interface PaymentIntent {
  bookingId: string;
  amountInPaise: number;
  currency: 'INR' | 'USD';
  customerEmail: string;
  customerName: string;
}

export interface PaymentResult {
  providerRef: string;
  status: 'created' | 'captured' | 'failed';
  url?: string;
}

export interface PaymentsProvider {
  createIntent(intent: PaymentIntent): Promise<PaymentResult>;
  verifyWebhook(body: string, signature: string): Promise<boolean>;
}

export function getPaymentsProvider(): PaymentsProvider {
  throw new Error(
    'No payments provider configured. Phase 2 will wire this up (e.g. Razorpay).',
  );
}
