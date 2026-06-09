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
