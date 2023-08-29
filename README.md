# Watch Together 🍿📺

Welcome to Watch Together, a synchronized video watching application that allows users to enjoy their favorite videos in sync with others, no matter where they are!

## Overview

Watch Together offers a seamless experience for synchronized video playback with friends. Users can initiate a Watch Together session by providing a unique room ID, which they can then share with their friends. The application features a custom video player that has been built from the ground up to enhance the collaborative video watching experience.

## Key Features

🎥 **Custom Video Player:** Enjoy videos with a custom-built video player that ensures synchronized playback for all participants.

🆔 **Unique Room ID:** To start a Watch Together session, users are prompted to enter a unique room ID. This ID serves as a way to identify and access the shared video room.

👥 **Collaborative Watching:** Multiple users can join the same room using the shared room ID, enabling them to watch the same video in perfect sync.

📡 **Real-time Database:** Watch Together utilizes Google Firebase's real-time database functionality to manage room creation and synchronization among participants.

## How It Works

1. **Access the Application:** Open the Watch Together website in your preferred browser.

2. **Enter Room ID:** Upon opening the site, a prompt will appear, asking for a room ID. If you're starting a new session, enter a unique ID of your choice. If you're joining an existing session, input the room ID provided by your friend.

3. **New Room:** If you enter a new room ID, the application will prompt you to input the video source you want to watch. Once you've set up the video source, you can share the room ID with your friends.

4. **Joining a Room:** If the room ID already exists and someone else has created it, entering the existing room ID will grant you access to the synchronized video playback. You'll instantly be watching with your friends!

[![Visit Demo](https://img.shields.io/badge/Visit%20Demo-blue)](https://watchtogether-d4d1a.web.app/)


## Technical Details

The Watch Together application is powered by Google Firebase's real-time database capabilities, which enable seamless synchronization of video playback among multiple users. When a new room is created, the room ID and video source information are stored in the database. This information is then used to manage access and ensure that all participants are watching the same content at the same time.

