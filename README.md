# Petal App


## Description
The Petal app is designed to revolutionize recycling habits by integrating AI-driven waste classification with a rewarding system and a local recycling center locator. This project aims to simplify the recycling process through technology, making sustainable practices more accessible and engaging for the general public in Singapore.

## Key Features
- **AI-Driven Waste Classification**: Utilizes a Large Language Model (LLM) combined with image recognition to accurately identify waste types and provide appropriate recycling instructions.
- **Local Recycling Center Locator**: Integrates GPS technology to help users find the nearest recycling bins and centers effortlessly.
- **Gamification and Rewards System**: Encourages sustainable behavior through in-app rewards and a competitive leaderboard to foster a community of proactive recyclers.
- **Personalized Recycling Guidance**: Offers customized advice based on user behavior to promote effective waste reduction strategies.
- **NEA Recycling Chatbot** : Utilize Large Language Model (LLM) and RAG framework using data NEA Recycling FAQ content to answer any recycling related query from the user

## Installation

```bash
git clone https://github.com/[YourGitHubUsername]/Petal.git
cd Petal/frontend/Petal
# Install dependencies
npm install
# Start the application
npm run web
```

Note that Node.js 20 is needed. It does not work as an webapp as it uses ios/android dependencies. Please scan the QR code via your phone to test the app.

As there is currently no user service or authentication service, simply click login to enter the app and test the main features.

Current testing shows that there might be issues with iOS functionality. The application is working as expected on Android devices.

There is no need to run the backend as it has already been deployed. 
