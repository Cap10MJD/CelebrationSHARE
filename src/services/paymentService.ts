// Mock payment service for development
// In production, this would call your actual backend API

interface PaymentIntentRequest {
  amount: number;
  currency: string;
  description: string;
  commission?: number;
  ownerPayout?: number;
}

interface PaymentIntentResponse {
  clientSecret: string;
  id: string;
  status: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
  };
}

interface PaymentResult {
  id: string;
  status: string;
  amount: number;
  currency: string;
  created: number;
  payment_method: string;
}

interface PaymentHistoryItem {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number;
  description: string;
  itemId: string;
}

interface RefundResult {
  id: string;
  amount: number;
  currency: string;
  status: string;
  payment_intent: string;
  created: number;
}

// Mock payment intent creation
export const createPaymentIntent = async (data: PaymentIntentRequest): Promise<PaymentIntentResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate a mock client secret
  const mockClientSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`;
  const mockPaymentIntentId = `pi_mock_${Date.now()}`;

  // Log commission and payout information for tracking
  if (data.commission && data.ownerPayout) {
    console.log('Payment Breakdown:', {
      totalAmount: data.amount,
      commission: data.commission,
      ownerPayout: data.ownerPayout,
      description: data.description
    });
  }

  // Simulate success/failure (90% success rate for demo)
  const isSuccess = Math.random() > 0.1;

  if (!isSuccess) {
    throw new Error('Payment intent creation failed. Please try again.');
  }

  return {
    clientSecret: mockClientSecret,
    id: mockPaymentIntentId,
    status: 'requires_payment_method'
  };
};

// Mock payment confirmation
export const confirmPayment = async (clientSecret: string, paymentMethod: PaymentMethod): Promise<PaymentResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate success/failure (95% success rate for demo)
  const isSuccess = Math.random() > 0.05;

  if (!isSuccess) {
    throw new Error('Payment failed. Please check your card details and try again.');
  }

  return {
    id: `pi_${Date.now()}`,
    status: 'succeeded',
    amount: 5000, // Mock amount
    currency: 'usd',
    created: Date.now(),
    payment_method: paymentMethod.id
  };
};

// Demo payment history for demonstration purposes
// In production, this would be fetched from the actual payment system
export const getPaymentHistory = async (): Promise<PaymentHistoryItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      id: 'pi_1234567890',
      amount: 6500,
      currency: 'usd',
      status: 'succeeded',
      created: Date.now() - 86400000, // 1 day ago
      description: 'Professional Sound System Rental',
      itemId: '1'
    },
    {
      id: 'pi_0987654321',
      amount: 4500,
      currency: 'usd',
      status: 'succeeded',
      created: Date.now() - 172800000, // 2 days ago
      description: 'Photography Equipment Rental',
      itemId: '2'
    }
  ];
};

// Mock refund creation
export const createRefund = async (paymentIntentId: string, amount?: number): Promise<RefundResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    id: `re_${Date.now()}`,
    amount: amount || 5000,
    currency: 'usd',
    status: 'succeeded',
    payment_intent: paymentIntentId,
    created: Date.now()
  };
}; 