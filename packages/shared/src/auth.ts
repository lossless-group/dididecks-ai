export interface SessionViewer {
  id: string;
  name: string;
  email: string;
  workspaceName: string;
}

export interface SessionState {
  authenticated: boolean;
  viewer: SessionViewer | null;
}

export interface SessionValidationRequest {
  sessionToken?: string;
}

export interface SignInRequest {
  email: string;
  password?: string;
}

export interface SignOutRequest {
  sessionToken?: string;
}

export interface AuthMutationResponse {
  status: 'pending-backend';
  message: string;
}
