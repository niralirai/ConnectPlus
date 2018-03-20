import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ParticlesConfigService } from '../services/particles-config.service';
import { User } from '../services/user';
import { DatabaseService } from '../services/database.service';
import { LocationService } from '../services/location.service';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
	lat: number = this.lat;
	lng: number = this.lng;

	editMood = false;
	editRange = false;

	nearbyUsers = [];
	displayedUser: any={};

	toggleMood(){
		this.editMood = !this.editMood;
	}

	toggleRange(){
		this.editRange = !this.editRange;
	}

	model = {
		user: new User(),
		moodStatus: ""
	}
	errors = {
		mood: ""
	}

	MoodStatus = "Mood Status";

	moodChange(){
		console.log(this.model);
		this.model.user.moodStatus = this.model.moodStatus;
		this.auth.getUser().then((user) => {
			this.db.updateUser(this.model.user).then((data) => {
				console.log(data);
				this.errors.mood = "Your mood status has been updated!"
			}).catch((err)=>{
				console.error(err);
				this.errors.mood = "Your mood status has NOT been updated!"

				//Form rejected for some reason
			})
		});


	}

	//ZOOM VALUE FOR MAP
	zoom: number = 15;
	currentZoom: number = 15;

	zoomMap(){
		this.zoom = this.currentZoom;
		
	}

	userVisible = false;

	viewUser(user: any={}){
		this.userVisible = true;
		this.displayedUser = user;
		this.displayedUser.distanceInMiles = Math.round((this.displayedUser.distance/5280)*100)/100;
		if(isNaN(this.displayedUser.distanceInMiles))
			this.displayedUser.distanceInMiles = 0;
	}

	closeUser(){
		this.userVisible = false;
  }
  
  filterVisible = false;

  viewFilter(){
    this.filterVisible = true;
  }

  closeFilter(){
    this.filterVisible = false;
  }

  toggleFilter(){
    this.filterVisible = !this.filterVisible;
    console.log("hit");
  }

  nearbyPin = ("../../assets/NearbyPin.png");
  userPin = ("../../assets/UserPin.png");


	particlesConfig;
	submitted = false;


	constructor(private auth: AuthService, public pConfig: ParticlesConfigService, private router: Router, private db: DatabaseService, public loc: LocationService ) {

		loc.getLocation().then((l)=> {
			auth.getUser().then((u) => {
				db.storeLocation(l, u.uid).then((d) =>{
					this.lat = l.latitude;
					this.lng = l.longitude;
					

					db.getNearbyUsers(u.uid).then((nearbyUsers) => {
						console.log("Nearby:",nearbyUsers);
						this.nearbyUsers = nearbyUsers;
					}).catch((err) => {
						console.error(err);
					})
				}).catch((e) =>{
					console.error(e);
				})
			})
		})


		this.auth.isAuthed().then((user) => {
			console.log("Authed:",user)
			this.model.user.uid = user.uid;
			
		});  

		this.auth.getUser().then((user) => {
			this.model.user.uid = user.uid;
			this.db.getUser(user.uid).then((userData) => {
				this.model.moodStatus = userData.moodStatus;

				this.model.user = userData;
				console.log(userData)
			})
		}); 
		
		



	}

	ngOnInit() {
	}

	filter_users(){

		if(true /*check facebook thing*/){
			this.auth.getUser().then((u) => {
				this.db.getFacebookFriends(u.uid).then((nearbyUsers) => {
					var friendMap = new Map();
					nearbyUsers.forEach((friend) => {
						friendMap.set(friend, null);
					});
					console.log("Nearby:",nearbyUsers);
					this.nearbyUsers = nearbyUsers;
				}).catch((err) => {
					console.error(err);
				})

			});

		}

	}