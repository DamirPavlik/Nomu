import { HttpClient } from "@angular/common/http";
import { inject, Injectable, InjectionToken } from "@angular/core";
import { Observable, tap } from "rxjs";

export type Role = 'customer' | 'restaurant' | 'courier';

interface TokenResponse {
    access_token: string,
    token_type: string;
}

interface UserResponse {
    id: string;
    email: string;
    name: string;
    role: Role;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000';

    get token(): string | null {
        return localStorage.getItem("nomu_token");
    }

    get role(): Role | null {
        return localStorage.getItem("nomu_role") as Role | null;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    register(email: string, password: string, name: string, role: Role): Observable<UserResponse> {
        return this.http.post<UserResponse>(`${this.apiUrl}/auth/register`, {email, password, name, role});
    }

    login(email: string, password: string): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.apiUrl}/auth/login`, {email, password}).pipe(
            tap((res) => {
                localStorage.setItem('nomu_token', res.access_token);
            })
        )
    }

    fetchMe(): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/auth/me`).pipe(
            tap((user) => localStorage.setItem('nomu_role', user.role))
        );
    }

    logout(): void {
        localStorage.removeItem('nomu_token');
        localStorage.removeItem('nomu_role');
    }
}