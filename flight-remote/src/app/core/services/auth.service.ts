import { Injectable } from '@angular/core';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly usersKey = 'flightPlannerUsers';
  private readonly currentUserKey = 'flightPlannerCurrentUser';

  signUp(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): boolean {

    const users = this.getUsers();

    // Check whether the email is already registered
    const existingUser = users.find(
      user =>
        user.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: this.generateId(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password
    };

    // Keep the new user in the registered-users list
    users.push(newUser);

    localStorage.setItem(
      this.usersKey,
      JSON.stringify(users)
    );

    // Automatically log the newly registered user in
    this.setCurrentUser(newUser);

    return true;
  }

  login(email: string, password: string): boolean {

    const users = this.getUsers();

    const user = users.find(
      currentUser =>
        currentUser.email.toLowerCase() === email.toLowerCase() &&
        currentUser.password === password
    );

    if (!user) {
      return false;
    }

    // This replaces whoever was previously logged in
    this.setCurrentUser(user);

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {

    const storedUser =
      localStorage.getItem(this.currentUserKey);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  private getUsers(): User[] {

    const storedUsers =
      localStorage.getItem(this.usersKey);

    if (!storedUsers) {
      return [];
    }

    return JSON.parse(storedUsers);
  }

  private setCurrentUser(user: User): void {

    localStorage.setItem(
      this.currentUserKey,
      JSON.stringify(user)
    );
  }

  private generateId(): string {
    return `user_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  }
}