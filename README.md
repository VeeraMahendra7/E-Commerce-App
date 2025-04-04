**E-Commerce Product Listing App**
A React Native e-commerce mobile application built for the Simplify Money Software Engineering Internship assessment. This app showcases a product listing interface with the ability to browse products, add them to cart, and maintain a wishlist.

**Features**
- Product listing with search and filter capabilities
- Product details view with description and images
- Cart management with AsyncStorage persistence
- Wishlist functionality (bonus feature)
- Search and filter options by category (bonus feature)
- Clean, responsive UI with intuitive navigation

**Tech Stack**
- React Native (Expo)
- React Navigation for routing
- Context API for state management
- AsyncStorage for persistent data storage
- FakeStore API for product data

**Prerequisites**
- Node.js 
- npm
- Expo CLI
- Android Studio (for Android development) or Xcode (for iOS development)

**Implementation Details**
1. API Integration
   Products are fetched from the FakeStore API (https://fakestoreapi.com/)
   All API calls are managed through the StoreContext provider

2. State Management
  Context API used for global state management
  AsyncStorage for persisting cart and wishlist data between app sessions

3. Navigation
  Tab-based navigation for main screens (Products, Cart, Wishlist)
  Stack navigation for product details

**Installation Steps**
1. Clone the repository:
   git clone [repository URL]
   cd e-commerce-app
2. Install dependencies:
   npm install
3. Start the development server:
   npm start
4. Run on device/emulator:
  Press 'a' in the terminal to run on Android emulator
  Press 'i' in the terminal to run on iOS simulator
  Scan the QR code with the Expo Go app on your physical device
