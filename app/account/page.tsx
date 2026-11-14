import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata = {
  title: "Client Account Dashboard | Frame Cottage",
  description:
    "Manage bespoke commissions, joinery tracking, formal RFQs, and white-glove shipping addresses.",
};

export default function AccountPage() {
  return <AccountDashboard />;
}
