import { Descriptions, Tag } from "antd";

const ProfileTab = (props) => {
  const { accountDataDetail } = props;

  const items = [
    {
      key: "1",
      label: "ID",
      children: accountDataDetail?.id,
    },
    {
      key: "2",
      label: "Username",
      children: accountDataDetail?.username,
      span: 2,
    },
    {
      key: "3",
      label: "Email",
      children: accountDataDetail?.email,
      span: 4,
    },
    {
      key: "4",
      label: "Role",
      children: <Tag color="green">{accountDataDetail?.role}</Tag>,
      span: 4,
    },
    {
      key: "5",
      label: "Created At",
      children: accountDataDetail?.created_at,
    },
    {
      key: "6",
      label: "Updated At",
      children: accountDataDetail?.updated_at
        ? accountDataDetail.updated_at
        : "No Data",
      span: 2,
    },
    {
      key: "7",
      label: "Fullname",
      children: accountDataDetail?.profile?.fullname,
      span: 4,
    },
    {
      key: "8",
      label: "Address",
      children: accountDataDetail?.profile?.address,
    },
  ];

  return (
    <div className="border-2 rounded-2xl border-amber-100">
      <Descriptions bordered items={items} />
    </div>
  );
};
export default ProfileTab;
