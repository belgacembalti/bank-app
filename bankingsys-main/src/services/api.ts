// src/services/api.ts

const API_BASE = "http://127.0.0.1:8000/api/accounts";

type VirtualCardResponse = {
  id: number;
  card_number: string;
  expiry_month: number;
  expiry_year: number;
  cvv: string;
  token_id: string;
  status: string;
  spending_limit: string;
  created_at: string;
};

export type VirtualCard = {
  id: number;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  tokenId: string;
  status: string;
  spendingLimit: number;
  createdAt: string;
};

function authHeaders() {
  const token = localStorage.getItem("access_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function mapVirtualCard(card: VirtualCardResponse): VirtualCard {
  return {
    id: card.id,
    cardNumber: card.card_number,
    expiryMonth: card.expiry_month,
    expiryYear: card.expiry_year,
    cvv: card.cvv,
    tokenId: card.token_id,
    status: card.status,
    spendingLimit: Number(card.spending_limit),
    createdAt: card.created_at,
  };
}

// ----------- REGISTER -----------
export async function register(data: {
  email: string;
  password: string;
  confirm_password: string;
  biometric_enabled: boolean;
}) {
  const response = await fetch(`${API_BASE}/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.email,   // Django uses username, so we reuse email
      email: data.email,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  return { success: true };
}

// ----------- LOGIN -----------
export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_BASE}/login/`, {
    method: "POST",
   headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.email,  // Django expects username
      password: data.password,
    }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Login failed");
  }

  // Store JWT token for later use
  localStorage.setItem("access_token", json.access);
  localStorage.setItem("refresh_token", json.refresh);

  return { success: true };
}

// ----------- LOGOUT -----------
export async function logout() {
  const refresh = localStorage.getItem("refresh_token");

  // Even if there is no refresh token, clear any stored data client-side.
  if (!refresh) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return { success: true };
  }

  const response = await fetch(`${API_BASE}/logout/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ refresh }),
  });

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Logout failed");
  }

  return { success: true };
}

// ----------- VIRTUAL CARDS -----------
export async function createVirtualCard(spendingLimit?: number): Promise<VirtualCard> {
  const response = await fetch(`${API_BASE}/virtual-cards/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(
      spendingLimit !== undefined ? { spending_limit: spendingLimit } : {}
    ),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Unable to create virtual card");
  }

  return mapVirtualCard(json);
}

export async function getVirtualCards(): Promise<VirtualCard[]> {
  const response = await fetch(`${API_BASE}/virtual-cards/`, {
    headers: authHeaders(),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || "Unable to load virtual cards");
  }

  return Array.isArray(json) ? json.map(mapVirtualCard) : [];
}

