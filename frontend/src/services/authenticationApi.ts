const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

type UserCredentials = {
  username: string;
  password: string;
};

type SignUpData = UserCredentials & {
  username: string;
  fullName: string;
  email: string;
  password: string;
};

type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
  error?: string;
};

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData: AuthResponse = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
}

export async function signIn(data: UserCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData: AuthResponse = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;
}

export async function refresh(refreshToken: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  return await response.json();
}
