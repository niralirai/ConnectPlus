import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SettingsComponent } from './settings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ParticlesModule } from 'angular-particle';
import { FormsModule }   from '@angular/forms';
import { twitterService } from '../services/twitter.service';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import { ClassesService } from '../services/classes.service';

import { ParticlesConfigService } from '../services/particles-config.service';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service'
import { User } from '../services/user';

let DatabaseServiceStub = {
	createUser(user: User){},
	updateUser(user: User){},
	getUser(uid: String){
		return new Promise((resolve, reject) => {
			resolve({});
		})
	},
	getClasses(uid: String): Promise<any>{
		return new Promise((resolve, reject) => {
			resolve([]);
		})
	},
	addClass(uid: String, cl:String): Promise<any>{
		return new Promise((resolve, reject) => {
			resolve({});
		})
	},
	deleteClass(uid: String, cl: String): Promise<any>{
		return new Promise((resolve, reject) => {
			resolve({});
		})
	},
	getInterests(uid: String): Promise<any>{
		return new Promise((resolve, reject) => {
			resolve([]);
		})
	},
	addInterest(uid: String, inter:String): Promise<any>{
		return new Promise((resolve, reject) => {
			resolve({});
		})
	},
	addFeedback(feedback:String): Promise<any>{
		return new Promise((resolve, reject) => {
			resolve({});
		})
	}
	// deleteInterest(uid: String, inter: String): Promise<any>{
	// 	return new Promise((resolve, reject) => {
	// 		resolve({});
	// 	})
	// }
}
let TwitterServiceStub = {
	getFriends(screenName: string){}
}
let ClassesServiceStub = {
	getClasses(subject: string):Promise<any>{
		return new Promise((resolve, reject) => {
			resolve([]);
		})
	},
	getSubjects(){
		return new Promise((resolve, reject) => {
			resolve([
				{
					Abbreviation: "AAE"
				},
				{
					Abbreviation: "AAR"
				},
				{
					Abbreviation: "AAA"
				},
				{
					Abbreviation: "AAD"
				}
			]);
		})
	}
}
let AuthServiceStub = {
	isAuthed(){
		return new Promise((resolve, reject) => {
			resolve(true);
		});
	},
	login(email, password){
		return new Promise((resolve, reject) => {
			resolve(true);
		});
	},
	logout(){
		return new Promise((resolve, reject) => {
			resolve(true);
		});
	},
	signup(email, password){
		return new Promise((resolve, reject) => {
			resolve(true);
		});  
	},
	resetpassowrd(email){
		return new Promise((resolve, reject) => {
			resolve(true);
		});
	},
	getUser(): Promise<any>{
		return new Promise((resolve, reject) => {
			resolve(true);
		})
	}
}

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ SettingsComponent ],
			providers: [{provide: AuthService, useValue: AuthServiceStub},
						{provide: DatabaseService, useValue: DatabaseServiceStub},
						{provide: ClassesService, useValue: ClassesServiceStub},
						{provide: twitterService, useValue: TwitterServiceStub},
						ParticlesConfigService, FacebookService],
			imports: [RouterTestingModule, ParticlesModule, FormsModule]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should load certain forms before divs are expand', () => {
		expect(fixture.debugElement.queryAll(By.css('form')).length).toEqual(4);
	});
	it('should load all forms after divs are expand', () => {
		component.invShow = true;
		component.genShow = true;
		component.secShow = true;
		component.conShow = true;
		component.intShow = true;
		component.fedShow = true;
		component.delShow = true;
		component.faceShow = true;
		component.twitShow = true;
		component.youShow = true;
		component.blackShow = true;
		fixture.detectChanges();
		expect(fixture.debugElement.queryAll(By.css('form')).length).toEqual(8);
	});
	it('should not load form labels when sections are collapsed', () => {
		expect(fixture.debugElement.queryAllNodes(By.css('#formTitle')).length).toEqual(0);
	});
	it('should load form labels when sections are expanded', () => {
		component.invShow = true;
		component.genShow = true;
		component.secShow = true;
		component.conShow = true;
		component.intShow = true;
		component.fedShow = true;
		component.delShow = true;
		component.faceShow = true;
		component.twitShow = true;
		component.youShow = true;
		component.blackShow = true;
		fixture.detectChanges();
		expect(fixture.debugElement.queryAllNodes(By.css('#formTitle')).length).toEqual(13);
	});
	it('should display proper errors changing password', () => {
		//current passowrd empty error
		component.secShow = true;
		fixture.detectChanges();
		var expectedError = "Please enter your password.";
		component.model.currentPassword = "";
		component.model.newPassword = "";
		component.model.conPassword = "";
		component.changepass();
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#curPassError")).nativeElement.innerText).toEqual(expectedError);
		
		//new password empty error
		component.secShow = true;
		fixture.detectChanges();
		var expectedError = "Please enter your new password.";
		component.model.currentPassword = "";
		component.model.newPassword = "";
		component.model.conPassword = "";
		component.changepass();
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#newPassError")).nativeElement.innerText).toEqual(expectedError);
		
		//confirm password empty error
		component.secShow = true;
		fixture.detectChanges();
		var expectedError = "Please confirm your password.";
		component.model.currentPassword = "";
		component.model.newPassword = "";
		component.model.conPassword = "";
		component.changepass();
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#conPassError")).nativeElement.innerText).toEqual(expectedError);
	})
	it('should display proper errors changing password diff new and con password', () => {
		//current passowrd empty error
		component.secShow = true;
		fixture.detectChanges();
		var expectedError = "Passwords must match!";
		component.model.currentPassword = "nirali";
		component.model.newPassword = "nirali1";
		component.model.conPassword = "nirali2";
		component.changepass();
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#conPassError")).nativeElement.innerText).toEqual(expectedError);
		
		
	})
// it('should display proper errors changing email ', () => {
		
// 		component.secShow = true;
// 		fixture.detectChanges();
// 		var expectedError = "Please provide a valid email.!";
// 		component.model.newEmail = "n";
// 		component.model.currentEmail = "niralirai@yahoo.com";
// 		component.model.emailChangePass = "nirali";
// 		component.verifyEmail();
// 		fixture.detectChanges();
// 		expect(fixture.debugElement.query(By.css("#newEmailError")).nativeElement.innerText).toEqual(expectedError);



// 		component.secShow = true;
// 		fixture.detectChanges();
// 		var expectedError = "Please provide differnt email.!";
// 		component.model.currentEmail = "niralirai@yahoo.com";
// 		component.model.newEmail = "niralirai@yahoo.com";
// 		component.model.emailChangePass = "nirali";
// 		component.verifyEmail();
// 		fixture.detectChanges();
// 		expect(fixture.debugElement.query(By.css("#newEmailchangeError")).nativeElement.innerText).toEqual(expectedError);
		
		
		
// 	})
	it('should display proper errors given invalid first and last name', () => {
		//current passowrd empty error
		component.genShow = true;
		fixture.detectChanges();
		var expectedError = "Please provide a valid first name.";
		component.model.user.firstName = "nirali123";
		component.updateInfo();
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#firstnameError")).nativeElement.innerText).toEqual(expectedError);


		component.genShow = true;
		fixture.detectChanges();
		var expectedError = "Please provide a valid last name.";
		component.model.user.lastName = "rai123";
		component.updateInfo();
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#lastnameError")).nativeElement.innerText).toEqual(expectedError);
		
		
	})
	it('should display proper errors when deleting account', () => {
		//current passowrd empty error
		component.delShow = true;
		fixture.detectChanges();
		var expectedError = "No Email and/or Password entered";
		component.model.email = "";
		component.model.password = "";
		component.del();
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#deleterError")).nativeElement.innerText).toEqual(expectedError);
		
		
	})

	it('should have a dropdown menu from which to select categories', () => {
		expect(fixture.debugElement.query(By.css('interestSelection'))).toBeTruthy;
	})

	it('should have text box to input interests', () => {
		expect(fixture.debugElement.query(By.css('interestInput'))).toBeTruthy;
	})




	it('should send feedback', () => {
		//current passowrd empty error
		component.fedShow = true;
		fixture.detectChanges();
		var expectedError = "";
		component.model.feedback = "hi i sent feedback";
		component.addFeedback(component.model.feedback);
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#feedbackSuccess")).nativeElement.innerText).toEqual(expectedError);

		
	})

	it('should send feedback error', () => {
		//current passowrd empty error
		component.fedShow = true;
		fixture.detectChanges();
		var expectedError = "Looks like you are tyring to submit nothing.";
		component.model.feedback = "";
		component.addFeedbacktester(component.model.feedback);
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("#feedbackError")).nativeElement.innerText).toEqual(expectedError);

		
	})

});