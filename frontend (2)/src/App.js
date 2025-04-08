import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./BaseFile/Pages/Login";
import AdminLogin from "./BaseFile/Pages/AdminLogin";
import AdminMenu from "./BaseFile/AdminFiles/AdminMenu";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminRefferal from "./Admin/AdminRefferal";
import RefferalTree from "./Admin/RefferalTree";
import AdminPlan from "./Admin/AdminPlan";
import AdminUserList from "./Admin/AdminUserList";
import AdminActPlan from "./Admin/AdminActPlan";
import AdminEditActPlan from "./Admin/AdminEditActPlan";
import AdminSupport from "./Admin/AdminSupport";
import AdminLevel from "./Admin/AdminLevel";
import AdminPendingWidhdrawalRequest from "./Admin/AdminPendingWidhdrawalRequest";
import AdminRewards from "./Admin/AdminRewards";
import AdminProfile from "./Admin/AdminProfile";
import Registration from "./BaseFile/Pages/Registration";
import UserProfile from "./User/UserProfile";
import AdminAddPlan from "./Admin/AdminAddPlan";
import AdminAddActPlan from "./Admin/AdminAddActPlan";
import AdminEditPlan from "./Admin/AdminEditPlan";
import UserAddSupport from "./User/UserAddSupport";
import UserAddWithdrawal from "./User/AddWithdrawal";
import UserDashboard from "./User/UserDashboard";
import UserMenu from "./BaseFile/UserFIles/UserMenu";
import AdminDeposite from "./Admin/AdminDeposite";
import UserDeposite from "./User/UserDeposite";
import UserDirectMember from "./User/UserDirectMember";
import UserReferralTree from "./User/UserReferralTree";

import UserPlan from "./User/UserPlan";
import AdminIncome from "./Admin/AdminIncome";
import UserIncome from "./User/UserIncome";
import AdminPrivateRoute from "./BaseFile/AdminFiles/AdminPrivateRoutes";
import UserPrivateRoute from "./BaseFile/UserFIles/UserPrivateRoutes";
import AdminReport from "./Admin/AdminReport";
import AdminSetting from "./Admin/AdminSetting";
import AdminUserCheck from "./Admin/AdminUserCheck";
import NotificationForm from "./Admin/NotificationForm";
import NotificationTable from "./Admin/NotificationTable";
import AdminTopup from "./Admin/AdminTopup";
import AdminTopupDetail from "./Admin/AdminTopupDetail";
import UserTopup from "./User/UserTopup";
import UserRetopup from "./User/UserRetopup"
import AdminQrLink from "./Admin/AdminQRLink";
import UserIncomeTransaction from "./User/UserIncomeTransaction";
import AdminLeadership from "./Admin/AdminLeadership";
import UserLeadershipTransaction from "./User/UserLeadership";
// import HeroSection from "./Blackbot/HeroSection";
import UserRewardDetail from "./User/UserRewardDetail";
import NotificationList from "./User/NotificationList";
import AdminCompoundWIthRequest from "./Admin/AdminCompoundWIthRequest";
import AdminRoiWithReq from "./Admin/AdminRoiWithReq";
import Transfer from "./User/Transfer";
import TopData from "./User/TopData";
import WalletTransaction from "./User/WalletTransaction";
import {Home} from "./HomeFile/Home"
import {Contact} from "./HomeFile/StaticsPage/Contact"
import Privacy from "./HomeFile/StaticsPage/Privacy"
import {Terms} from "./HomeFile/StaticsPage/Terms"
import {About} from "./HomeFile/StaticsPage/About"
import AdminAchiver from "./Admin/AdminAchiver";
import ForgotPassword from "./BaseFile/Pages/ForgotPassword";
import AdminCto from "./Admin/AdminCto";
import DefaulterUsers from "./Admin/DefaulterUsers";
import { UserSalaryDetails } from "./User/UserSalaryDetails";
import UserKyc from "./User/UserKyc";
import UserViewAd from "./User/UserViewAd";
import UserKycCharge from "./User/UserKycCharge";
import UserKycInfo from "./User/UserKycInfo";
import UserKycDetails from "./User/UserKycDetails";
import UserKycTransfer from "./User/UserKycTransfer";
import UserKycHistory from "./User/UserKycHistory";
import UserWithdrawal from "./User/UserWithdrawal";
import UserWithdrawalHistory from "./User/UserWithdrawalHistory";
import UserBankDetails from "./User/UserBankDetails";
import MyTransactions from "./User/MyTransactions";
import WatchAdVideo from "./User/WatchAddVideo";
import JoinTelegram from "./User/JoinTelegram";
import SponsorBonus from "./User/SponsorBonus";
import MiningButton from "./User/RoiMining";
import DirectReferralsTable from "./User/DirectReferralsTable";
import BonusManagement from "./Admin/BonusManagment";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/registration" element={ <Registration/>}/>
        <Route path="/user/login" element={ <Login/>}/>
        <Route path="/" element={ <Home/>}/>
        <Route path="/contact" element={ <Contact/>}/>
        <Route path="/terms" element={ <Terms/>}/>
        <Route path="/privacy" element={ <Privacy/>}/>
        <Route path="/about" element={ <About/>}/>
        {/* <Route path="/blogs" element={ <Blog/>}/> */}
        <Route path="/Admin/login" element={ <AdminLogin/>}/>
        <Route path="/reset-password/:token" element={ <ForgotPassword/>}/>
        {/* <Route path="/" element={<AdminPrivateRoute/>}> */}
        <Route path="/admin/dashboard" element={ <AdminMenu Children={<AdminDashboard/>} PageName={"DashBoard"}/>}/>
        <Route path="/admin/cto" element={ <AdminMenu Children={<AdminCto/>} PageName={"CTO"}/>}/>
        <Route path="/admin/refferaltable/:referral_code" element={ <AdminMenu Children={<AdminRefferal/>} PageName={"Refferal Table"}/>}/>
        <Route path="/admin/refferal/:referral_code" element={ <AdminMenu Children={<RefferalTree/>} PageName={"Refferal Table"}/>}/>
        <Route path="/admin/membership/plan" element={ <AdminMenu Children={<AdminPlan/>} PageName={"Investment Plan"}/>}/>
        <Route path="/admin/activation/plan" element={ <AdminMenu Children={<AdminActPlan/>} PageName={"Activation Plan"}/>}/>
        <Route path="/admin/user/:action" element={ <AdminMenu Children={<AdminUserList/>} PageName={"User"}/>}/>
        <Route path="/admin/support" element={ <AdminMenu Children={<AdminSupport/>} PageName={"Support"}/>}/>
        <Route path="/admin/level" element={ <AdminMenu Children={<AdminLevel/>} PageName={"Level"}/>}/>
        <Route path="/admin/pendingwithdrawalrequest" element={ <AdminMenu Children={<AdminPendingWidhdrawalRequest/>} PageName={"Pending Withdrawal Request"}/>}/>
        <Route path="/admin/pendingwithdrawalrequest/:action" element={ <AdminMenu Children={<AdminPendingWidhdrawalRequest/>} PageName={"Pending Withdrawal Request"}/>}/>
        <Route path="/admin/compoundpendingwithdrawalrequest" element={ <AdminMenu Children={<AdminCompoundWIthRequest/>} PageName={"Pending Compound Withdrawal Request"}/>}/>
        <Route path="/admin/roipendingwithdrawalrequest" element={ <AdminMenu Children={<AdminRoiWithReq/>} PageName={"Pending ROI Withdrawal Request"}/>}/>
        <Route path="/admin/rewards" element={ <AdminMenu Children={<AdminRewards/>} PageName={"Rewards"}/>}/>
        <Route path="/admin/deposite" element={ <AdminMenu Children={<AdminDeposite/>} PageName={"Deposite"}/>}/>
        <Route path="/admin/deposite/:action" element={ <AdminMenu Children={<AdminDeposite/>} PageName={"Deposite"}/>}/>
        <Route path="/admin/profile" element={ <AdminMenu Children={<AdminProfile/>} PageName={"Admin Profile"}/>}/>
        <Route path="/admin/addplan" element={ <AdminMenu Children={<AdminAddPlan/>} PageName={"Add Plan"}/>}/>
        <Route path="/admin/addactplan" element={ <AdminMenu Children={<AdminAddActPlan/>} PageName={"Add Activation Plan"}/>}/>
        <Route path="/admin/editplan/:id" element={ <AdminMenu Children={<AdminEditPlan/>} PageName={"Edit investment Plan"}/>}/>
        <Route path="/admin/editactplan/:id" element={ <AdminMenu Children={<AdminEditActPlan/>} PageName={"Edit activation Plan"}/>}/>
        <Route path="/admin/income" element={ <AdminMenu Children={<AdminIncome/>} PageName={"Income"}/>}/>
        <Route path="/admin/reports" element={ <AdminMenu Children={<AdminReport/>} PageName={"Report"}/>}/>
        <Route path="/admin/settings" element={ <AdminMenu Children={<AdminSetting/>} PageName={"Settings"}/>}/>
        <Route path="/admin/check/profile/:id" element={ <AdminMenu Children={<AdminUserCheck/>} PageName={"User Profile"}/>}/>
        <Route path="/admin/topup" element={ <AdminMenu Children={<AdminTopup/>} PageName={"Topup"}/>}/>
        <Route path="/admin/topup/detail/:id" element={ <AdminMenu Children={<AdminTopupDetail/>} PageName={"Topup Detail"}/>}/>
        <Route path="/admin/qr/Link" element={ <AdminMenu Children={<AdminQrLink/>} PageName={"QR Link"}/>}/>
        <Route path="/admin/leadership" element={ <AdminMenu Children={<AdminLeadership/>} PageName={"leadership Income"}/>}/>
        <Route path="/admin/notification" element={ <AdminMenu Children={<NotificationForm/>} PageName={"Notification Form"}/>}/>
        <Route path="/admin/notification/list" element={ <AdminMenu Children={<NotificationTable/>} PageName={"Notification Table"}/>}/>
        <Route path="/admin/achivers" element={ <AdminMenu Children={<AdminAchiver/>} PageName={"Achivers Table"}/>}/>
        <Route path="/admin/defaulter" element={ <AdminMenu Children={<DefaulterUsers/>} PageName={"Defaulter Users"}/>}/>
        <Route path="/admin/bonus-manager" element={ <AdminMenu Children={<BonusManagement/>} PageName={"Bonus Management"}/>}/>
        
        {/* </Route> */}
        <Route path="/" element={<UserPrivateRoute/>}>
        <Route path="/user/profile/:id" element={ <UserMenu Children={<UserProfile/>} PageName={"User Profile"}/>}/>
        <Route path="/user/sendsupport" element={ <UserMenu Children={<UserAddSupport/>} PageName={"Send Message"}/>}/>
        <Route path="/user/addwithdrawal" element={ <UserMenu Children={<UserAddWithdrawal/>} PageName={"Withdrawal Request"}/>}/>
        <Route path="/user/adddeposite" element={ <UserMenu Children={<UserDeposite/>} PageName={"Deposit"}/>}/>


        <Route path="/user/dashboard" element={ <UserMenu Children={<UserDashboard/>} PageName={"User Dashboard"}/>}/>
        <Route path="/user/userKyc" element={ <UserMenu Children={<UserKyc/>} PageName={"User Kyc"}/>}/>
        {/* <Route path="/user/userViewAd" element={ <UserMenu Children={<UserViewAd/>} PageName={"User View Ad"}/>}/> */}
        <Route path="/user/userKycCharge" element={ <UserMenu Children={<UserKycCharge/>} PageName={"User View Ad"}/>}/>
        <Route path="/user/UserKycDetails" element={ <UserMenu Children={<UserKycDetails/>} PageName={"User View Ad"}/>}/>
        <Route path="/user/UserKycTransfer" element={ <UserMenu Children={<UserKycTransfer/>} PageName={"User View Ad"}/>}/>
        <Route path="/user/UserKycHistory" element={ <UserMenu Children={<UserKycHistory/>} PageName={"User View Ad"}/>}/>
        <Route path="/user/UserWithdrawal" element={ <UserMenu Children={<UserWithdrawal/>} PageName={"User View Ad"}/>}/>
        <Route path="/user/UserWithdrawalHistory" element={ <UserMenu Children={<UserWithdrawalHistory/>} PageName={"User View Ad"}/>}/>
        <Route path="/user/UserBankDetails" element={ <UserMenu Children={<UserBankDetails/>} PageName={"User View Ad"}/>}/>
        <Route path="/user/referraltree" element={ <UserMenu Children={<UserReferralTree/>} PageName={"Refferal Tree"}/>}/>
        <Route path="/transactions/:source"  element={ <UserMenu Children={<MyTransactions/>} PageName={"Transaction "}/>}/>
        <Route path="/user/transaction/:table_name/:fit" element={ <UserMenu Children={<UserIncomeTransaction/>} PageName={"income "}/>}/>
        <Route path="/user/income" element={ <UserMenu Children={<UserIncome/>} PageName={"Income "}/>}/>
        <Route path="/user/directmember" element={ <UserMenu Children={<DirectReferralsTable/>} PageName={"Direct Member"}/>}/>
       
        <Route path="/watch-adds"  element={<UserMenu Children={<UserViewAd/>} PageName={"Watch Adds"}/>} />
            <Route path="/join-telegram"    element={<UserMenu Children={<JoinTelegram/>} PageName={"Watch Adds"}/>}  />
            <Route path="/sponsor-code" element={<UserMenu Children={<SponsorBonus/>} PageName={"Watch Adds"}/>}  /> 
            <Route path="/roi-mining" element={<UserMenu Children={<MiningButton/>} PageName={"ROI Mining"}/>}  />
        <Route path="/user/plan" element={ <UserMenu Children={<UserPlan/>} PageName={"User Plan"}/>}/>
        <Route path="/user/salary" element={ <UserMenu Children={<UserSalaryDetails/>} PageName={"Salary Details "}/>}/>
        <Route path="/user/topup" element={ <UserMenu Children={<UserTopup/>} PageName={"Topup "}/>}/>
        <Route path="/user/retopup" element={ <UserMenu Children={<UserRetopup/>} PageName={"ReTop-Up "}/>}/>
        <Route path="/user/transaction/:table_name" element={ <UserMenu Children={<UserIncomeTransaction/>} PageName={"income "}/>}/>
        <Route path="/user/leadership" element={ <UserMenu Children={<UserLeadershipTransaction/>} PageName={"Leadership Transaction"}/>}/>
        {/* <Route path="/user/transaction/leadership" element={ <UserMenu Children={<UserIncomeTransaction/>} PageName={"Transaction"}/>}/> */}
        <Route path="/user/reward/detail" element={ <UserMenu Children={<UserRewardDetail/>} PageName={"Reward Detail"}/>}/>
        <Route path="/user/transfer" element={ <UserMenu Children={<Transfer/>} PageName={"transfer fund"}/>}/>
        <Route path="/user/top" element={ <UserMenu Children={<TopData/>} PageName={"transfer fund"}/>}/>
        <Route path="/user/notification" element={ <UserMenu Children={<NotificationList/>} PageName={"Notification List"}/>}/>
        <Route path="/user/dep" element={ <UserMenu Children={<WalletTransaction/>} PageName={"Notification List"}/>}/>
        <Route path="/user/reward" element={ <UserMenu Children={<UserRewardDetail/>} PageName={"Reward List"}/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
