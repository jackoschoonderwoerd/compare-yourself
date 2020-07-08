import { Injectable } from '@angular/core';
import { 
  CognitoUserPool, 
  CognitoUserAttribute, 
  CognitoUser, 
  AuthenticationDetails, 
  CognitoUserSession 
} from 'amazon-cognito-identity-js'

import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const POOL_DATA = {
  UserPoolId: 'eu-central-1_og6vZpt4U',
  ClientId: '6g4lpcjf1cnu4tl1tmltvdtpgi'
};

const userPool = new CognitoUserPool(POOL_DATA);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registeredUser: CognitoUser;

  constructor(private router: Router) { }

  signUp(name: string, email: string, password: string): void {
    const user: User = {
      name: name,
      email: email,
      password: password
    };
    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    }
    attrList.push(new CognitoUserAttribute(emailAttribute));
    userPool.signUp(user.name, user.password, attrList, null, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        this.registeredUser = result.user;
        console.log(result);
      }
    });
    return;
  };

  confirmUser(userName: string, validationCode: string) {
    const userData = {
      Username: userName,
      Pool: userPool
    }
    const cognitoUser = new CognitoUser(
      userData
    );
    cognitoUser.confirmRegistration(validationCode, true, (err, result) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(result);
        this.router.navigate(['login']);
      }
    })
  }

  signIn(username: string, password: string) {
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    const that = this;
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        console.log(result)
      },
      onFailure(err) {
        console.log(err)
      }
    });
  }
  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    const obs = Observable.create((observer) => {
      if(!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if(err) {
            observer.next(false);
          } else {
            if(session.isValid()) {
              console.log('user is authenticated')
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }
}

