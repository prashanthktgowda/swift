import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Use Switch instead of Routes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import RideHistoryPage from './pages/RideHistoryPage';
import PaymentPage from './pages/PaymentPage';
import BookingPage from './pages/BookingPage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import SettingsPage from './pages/SettingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import FareManagementPage from './pages/FareManagementPage';
import CashPaymentPage from './pages/CashPaymentPage';
import SplitFarePage from './pages/SplitFarePage';
import RoyaltyRewardsPage from './pages/RoyaltyRewardsPage';
import RideSharingPage from './pages/RideSharingPage';
import DriverRatingPage from './pages/DriverRatingPage';
import ScheduleRidesPage from './pages/ScheduleRidesPage';
import VehicleSelectionPage from './pages/VehicleSelectionPage';
import UberPoolPage from './pages/UberPoolPage';
import FareCalculatorPage from './pages/FareCalculatorPage';
import RouteSelectionPage from './pages/RouteSelectionPage';
import ETAPage from './pages/ETAPage';
import PushNotificationsPage from './pages/PushNotificationsPage';
import MultipleDestinationsPage from './pages/MultipleDestinationsPage';
import EmergencyAssistancePage from './pages/EmergencyAssistancePage';
import TrustedContactsPage from './pages/TrustedContactsPage';
import RealTimeIDCheckPage from './pages/RealTimeIDCheckPage';
import SpeedLimitAlertsPage from './pages/SpeedLimitAlertsPage';
import CustomerSupportPage from './pages/CustomerSupportPage';
import UberEatsIntegrationPage from './pages/UberEatsIntegrationPage';
import UberForBusinessPage from './pages/UberForBusinessPage';
import RewardsLoyaltyProgramsPage from './pages/RewardsLoyaltyProgramsPage';
import DashboardPage from './pages/DashboardPage';
import RiderLoginPage from './pages/RiderLoginPage';
import RiderDashboardPage from './pages/RiderDashboardPage';
import EmailCollectionPage from './pages/EmailCollectionPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import NavBar from './components/NavBar';
import './App.css'; // Import global styles

function App() {
    console.log('App component rendered');
    return (
        <Router>
            <div className="App">
                <NavBar /> {/* Add navigation bar */}
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" exact component={SignUpPage} />
                    <Route path="/signup/drive-deliver" component={SignUpPage} />
                    <Route path="/signup/rider" component={SignUpPage} />
                    <Route path="/signup/rider-login" component={RiderLoginPage} />
                    <Route path="/signup/uber-eats" component={SignUpPage} />
                    <Route path="/signup/business" component={SignUpPage} />
                    <Route path="/signup/rider-email" component={EmailCollectionPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/ride-history" component={RideHistoryPage} />
                    <Route path="/payment" component={PaymentPage} />
                    <Route path="/booking" component={BookingPage} />
                    <Route path="/driver-dashboard" component={DriverDashboardPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="/admin-dashboard" component={AdminDashboardPage} />
                    <Route path="/fare-management" component={FareManagementPage} />
                    <Route path="/cash-payment" component={CashPaymentPage} />
                    <Route path="/split-fare" component={SplitFarePage} />
                    <Route path="/royalty-rewards" component={RoyaltyRewardsPage} />
                    <Route path="/ride-sharing" component={RideSharingPage} />
                    <Route path="/driver-rating" component={DriverRatingPage} />
                    <Route path="/schedule-rides" component={ScheduleRidesPage} />
                    <Route path="/vehicle-selection" component={VehicleSelectionPage} />
                    <Route path="/uber-pool" component={UberPoolPage} />
                    <Route path="/fare-calculator" component={FareCalculatorPage} />
                    <Route path="/route-selection" component={RouteSelectionPage} />
                    <Route path="/eta" component={ETAPage} />
                    <Route path="/push-notifications" component={PushNotificationsPage} />
                    <Route path="/multiple-destinations" component={MultipleDestinationsPage} />
                    <Route path="/emergency-assistance" component={EmergencyAssistancePage} />
                    <Route path="/trusted-contacts" component={TrustedContactsPage} />
                    <Route path="/real-time-id-check" component={RealTimeIDCheckPage} />
                    <Route path="/speed-limit-alerts" component={SpeedLimitAlertsPage} />
                    <Route path="/customer-support" component={CustomerSupportPage} />
                    <Route path="/uber-eats-integration" component={UberEatsIntegrationPage} />
                    <Route path="/uber-for-business" component={UberForBusinessPage} />
                    <Route path="/rewards-loyalty-programs" component={RewardsLoyaltyProgramsPage} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/terms-and-conditions" component={TermsAndConditionsPage} />
                    <Route path="/rider-dashboard" component={RiderDashboardPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;

