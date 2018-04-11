<div class="row" id="mainDiv">
	<div class="medium-12 medium-centered column" id="welcomeDiv">
		<div class="medium-12 medium-centered column" id="messageDiv">
			<p class="unselectable" id="title">Explore the World Around You!</p>
		</div>

		<div class="medium-12 column" id="mapView">
			<div class="medium-12 column" id="innerMap" [ngClass]="{'' : !userVisible, 'opacity' : userVisible, '' : !filterVisible, 'opacity' : filterVisible}">
				<agm-map [latitude]="lat" [longitude]="lng" [zoomControl]="false" [mapTypeControl]="false" [scaleControl]="false" [streetViewControl]="false"
				 [rotateControl]="false" [fullscreenControl]="false" [mapDraggable]="false" [scrollwheel]="false" [zoom]="zoom" [clickableIcons]="false">
					<agm-marker [latitude]="lat" [longitude]="lng" [iconUrl]="userPin" (markerClick)="viewUser(model.user)"></agm-marker>
					<agm-marker *ngFor="let user of filteredUsers" (markerClick)="viewUser(user)" [iconUrl]="nearbyPin" [latitude]="user.lat"
					 [longitude]="user.lon"></agm-marker>
				</agm-map>
			</div>

			<div id="refreshDiv">
				<button class="button refreshButton" (click)="refreshMap()">
					<i class="fa fa-refresh"></i>
				</button>
			</div>
			<div class="medium-12 column" id="selectedUser" [ngClass]="{'' : userVisible, 'none' : !userVisible}">
				<!-- <div class="medium-3 column" class="hidden">A</div> -->
				<div class="medium-12 column" id="selectedUserInfo">
					<img id="listUser" [src]="displayedUser.url">
					<br>


					<div id="SelectedUserDivInfo" class="medium-12 column">
						<div class="medium-8 column" id="innerDiv">
							<p id="SelectedUserNameSmall">{{displayedUser.firstName}} {{displayedUser.lastName}}</p>
						</div>
						<div class="medium-8 column" id="innerDiv">
							<p id="SelectedLowerText">{{displayedUser.moodStatus}}</p>
						</div>
						<div class="medium-8 column" id="innerDiv">
							<p id="SelectedLowerText">{{displayedUser.distanceInMiles}} Miles</p>
						</div>
						<div class="medium-8 column" id="innerDiv">
							<p id="SelectedLowerText">{{displayedUser.commons}}</p>
						</div>
						<div class="medium-6 column">
							<button class="button selectedButton">
								<i class="fa fa-pencil"></i> Message</button>
						</div>
						<div class="medium-6 column">
							<button class="button selectedButton" (click)="closeUser()">
								<i class="fa fa-times"></i> Close</button>
						</div>
					</div>
				</div>
			</div>

			<div class="medium-12 column" id="filterSection" [ngClass]="{'' : filterVisible, 'none' : !filterVisible}">
				<!-- <div class="medium-3 column" class="hidden">A</div> -->
				<div class="medium-12 column" id="filterContent">
					<p id="filterTitle">Only see those with similar...</p>

					<div class="medium-10 column">
						<select id="filterSelect" [(ngModel)]="currentFilter">
							<option selected="true" disabled="disabled">Select a Filter</option>
							<option value="Facebook">Facebook</option>
							<option value="Twitter">Twitter</option>
							<option value="Youtube">Youtube</option>
							<option value="Blackboard">Blackboard</option>
							<option *ngFor="let inter of interestKeys" [value]="inter">Interest: {{inter}}</option>
						</select>
					</div>
					<div class="medium-2 column">
						<button class="button addFilterButton" (click)="addFilter()"><i class="fa fa-plus"></i></button>
					</div>
					<div class="medium-12 column" id="currentFilters">
						<p id="currentFilterText" *ngFor="let filter of currentFilterArray">{{filter}}	<i class="fa fa-times" id="deleteFilter" (click)="removeFilter(filter)"></i></p>
					</div>

					<div class="medium-6 column">
						<!-- <button class="button selectedButton" (click)="updateFilter()"><i class="fa fa-check"></i> Update</button> -->
					</div>
					<div class="medium-6 column">
						<button class="button selectedButton" (click)="closeFilter()">
							<i class="fa fa-times"></i> Close</button>

					</div>
				</div>
			</div>
		</div>

		<!-- <div class="medium-4 column" id="invisible">I</div> -->
		<div class="medium-12 column" id="iconDiv">
			<!--	<img id="userpic" src="../../assets/profileicon.ico">-->
			<img id="userpic" [src]="model.user.url" />
			<br>
		</div>
		<!-- <div class="medium-4 column" id="invisible">I</div> -->

		<div class="medium-12 column" id="userView">
			<div class="medium-6 column" id="userNameDiv">
				<p id="userName">{{model.user.fullName}} </p>
			</div>
			<div class="medium-6 column" id="toggleDiv">
				<button type="button" class="button mapButton" id="listButton" routerLink="/list" routerLinkActive="active">
					<i class="fa fa-list-ul"></i> List View</button>
				<button type="button" class="button mapButton" id="filterButton" (click)="toggleFilter()">
					<i class="fa fa-filter"></i> Filter</button>
				<button type="button" class="button mapButton" id="rangeButton" (click)="toggleRange()">
					<i class="fa fa-sliders"></i> Range</button>

			</div>

			<div class="medium-12 column" id="moodStatusDiv">

				<p id="moodStatus">{{model.user.moodStatus}}
					<i class="fa fa-pencil" id="editMood" (click)="toggleMood()"></i>
				</p>
			</div>

			<div id="editMoodDiv" class="medium-6 column" [ngClass]="{'' : editMood, 'hidden' : !editMood}">
				<form (ngSubmit)="moodChange()" #signupForm="ngForm">

					<div class="medium-6 column">
						<select id="moodSelect" name="mood" [(ngModel)]="model.moodStatus">
							<option value="Online">Online</option>
							<option value="Away">Away</option>
							<option value="Offline">Offline</option>
						</select>
					</div>
					<div class="medium-6 column">
						<button class="button updateMood">Update</button>
					</div>
				</form>
			</div>

			<div class="medium-6 column" [ngClass]="{'' : editRange, 'hidden' : !editRange}">
				<div class="medium-8 column">
					<div class="slidecontainer">
						<input type="range" min="15" max="19" value="15" step="1" class="slider" id="range" [(ngModel)]="currentZoom" />
					</div>
				</div>
				<div class="medium-2 column">
					<p id="sliderValue">{{currentZoom-14}}x</p>
				</div>
				<div class="medium-2 column">
					<button class="button updateMood" (click)="zoomMap()">Update</button>
				</div>

			</div>

			<div id="invisibilityDiv medium-12 column">
				<!-- <form (ngSubmit)="vis()" #signupForm="ngForm"> -->

				<div class="mobile-app-toggle" data-mobile-app-toggle>
					<button class="button" (click)="setVisible(0)" [ngClass]="{' ' : visibility!=0, 'is-active' : visibility==0}">Invisible</button>
					<button class="button" (click)="setVisible(4)" [ngClass]="{' ' : visibility!=4, 'is-active' : visibility==4}">Invisible for 4 hours</button>
					<button class="button" (click)="setVisible(12)" [ngClass]="{' ' : visibility!=12, 'is-active' : visibility==12}">Invisible for 12 hours</button>
					<button class="button" (click)="setVisible(24)" [ngClass]="{' ' : visibility!=24, 'is-active' : visibility==24}">Invisible for 1 day</button>
					<button class="button" (click)="setVisible(100)" [ngClass]="{' ' : visibility!=100, 'is-active' : visibility==100}">Visible</button>
				</div>

				<!-- </form> -->
				<!-- localStorage.setItem("localVisibility", visibility);-->
			</div>

			<div class="medium-12 medium-centered column" id="settingsDiv">
				<!-- <button class="button mapButton" id="broadcastButton" (click)="toggleBroadcasts()"><i class="fa fa-bullhorn"></i>	Broadcasts</button> -->
				<div class="mobile-app-toggle" data-mobile-app-toggle>
					<button class="button" (click)="toggleBroadcasts()" [ngClass]="{' ' : !viewBroadcasts, 'is-active' : viewBroadcasts}">
						<i class="fa fa-bullhorn"></i> Broadcasts</button>
					<button class="button" (click)="toggleMessages()" [ngClass]="{' ' : !viewMessages, 'is-active' : viewMessages}">
						<i class="fa fa-comment"></i> Messages</button>
				</div>
			</div>
			<!-- Broadcasting Section -->
			<div class="medium-12 medium-centered column" id="broadcastsDiv" [ngClass]="{' ' : viewBroadcasts, 'none' : !viewBroadcasts}">
				<div>
					<div class="medium-5 column" id="broadHeader">
						<p id="bHeaderText">Current Broadcasts</p>
					</div>
					<div class="medium-7 column" id="broadHeader">
						<button class="button bHeaderButton" (click)="toggleFilterBroadcast()">
							<i class="fa fa-filter"></i> Filter</button>
						<button class="button bHeaderButton" (click)="toggleNewBroadcast()">
							<i class="fa fa-plus"></i> Add New</button>
					</div>
				</div>
				<div class="medium-12 column" id="newBroadcast" [ngClass]="{' ' : newBroadcast, 'none' : !newBroadcast }">
					<div class="medium-2 column">
						<select id="broadSelect">
							<option selected="true" disabled="disabled">Interest Category</option>
							<option *ngFor="let cat of testArray" [value]=cat>{{cat}}</option>
						</select>
					</div>
					<div class="medium-3 column">
						<select id="broadSelect">
							<option selected="true" disabled="disabled">Specific Interest</option>
							<option *ngFor="let interest of testArray" [value]=interest>{{interest}}</option>
						</select>
					</div>
					<div class="medium-5 column">
						<input type="text" id="newBroadInput" placeholder="Message" [(ngModel)]="broadcastText">
					</div>
					<div class="medium-2 column">
						<button class="button newBroadButton"(click) = "sendBroadcast()"><i class="fa fa-bullhorn"></i> Broadcast</button>
					</div>
				</div>
				<div class="medium-12 column" id="filterBroadcast" [ngClass]="{' ' : filterBroadcast, 'none' : !filterBroadcast }">
					<div class="medium-4 column">
						<select id="broadSelect">
							<option selected="true" disabled="disabled">Interest Category</option>
							<option *ngFor="let cat of testArray" [value]=cat>{{cat}}</option>
						</select>
					</div>
					<div class="medium-5 column">
						<select id="broadSelect">
							<option selected="true" disabled="disabled">Specific Interest</option>
							<option *ngFor="let interest of testArray" [value]=interest>{{interest}}</option>
						</select>
					</div>
					<div class="medium-3 column">
						<button class="button newBroadButton">
							<i class="fa fa-floppy-o"></i> Save</button>
					</div>
				</div>
				<div class="medium-12 column" id="broadContent">
						<div class="medium-5 medium-centered column" id="broadcastList">
								<div id="broadcastPanel" *ngFor="let broad of broadcasts">
									<div class="medium-4 column">
											<img id="broadPic" [src]="broad.url"/><br>
									</div>
									<div class="medium-8 column">
										<p class="broadcastText">Subject (Will be set later)</p>
										<p class="broadcastText">{{broad.message}}</p>
										<div class="medium-4 column">
											<button class="button broadButton" (click)= "viewBroadcast(broad)">View</button>
										</div>
									</div>
								</div>
						</div>
						<div class="medium-7 column" id="threadView">
							<div id="threadExpanded">
								<div class="medium-12 column" id="threadHeader">
									<div class="medium-3 column">
										<img id="threadPic" [src]="model.user.url"/><br>
										<p id="threadUser">[Member Name]</p>
									</div>
									<div class="medium-9 column">
										<p class="broadcastText">In: [Subject]</p>
										<p class="broadcastText">[Message]</p>
									</div>
								</div>
								<div class="medium-12 column" id="threadComment" *ngFor="let com of testArray">
									<div class="medium-2 column">
										<img id="commentPic" [src]="model.user.url"/><br>
									</div>
									<div class="medium-10 column">
										<p class="broadcastText">[Member Name]</p>
										<p class="broadcastText">[Comment]</p>
									</div>
								</div>
							</div>
							<div id="broadResponse">
								<input type="text" id="broadInput" [(ngModel)]="responseText">
								<button class="button broadInputButton"><i class="fa fa-paper-plane"(click)="respondToBroadcast()"></i> Send</button>
						</div>
					</div>
				</div>
			</div>
			<!-- Messaging Section -->
			<div class="medium-12 medium-centered column" id="messagesDiv" [ngClass]="{' ' : viewMessages, 'none' : !viewMessages}">
				<div>
					<div class="medium-12 column" id="broadHeader">
						<p id="bHeaderText">Current Messages</p>
					</div>
				</div>
				<div class="medium-12 column" id="broadContent">
					<div class="medium-3 medium-centered column" id="broadcastList">
						<div id="messagesPanel" *ngFor="let num of testArray">
							<div class="medium-5 column">
								<img id="messagesPic" [src]="model.user.url" />
								<br>
							</div>
							<div class="medium-7 column" id="messagesInfo">
								<p id="messagesText">[Member Name]</p>
								<p id="messagesText">[Mood Status]</p>
							</div>
						</div>
					</div>
					<div class="medium-9 column" id="messagesView">
						<div id="messagesThread">
							<div id="message" *ngFor="let m of testArray" [ngClass]="{'messageLeft' : m%2==0, 'messageRight' : m%2==1}">
								<p>Message #{{m}}</p>
							</div>
						</div>
						<div id="messageResponse">
							<input type="text" id="broadInput">
							<button class="button broadInputButton">
								<i class="fa fa-paper-plane"></i> Send</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

</div>