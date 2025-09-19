import { Modal, Tabs, Image, Divider } from "antd";
import ProfileTab from "./ProfileTab";
import Anonymous from "../../../assets/profilePics/Anonymous.png";

const ModalViewDetailAccount = (props) => {
  const { openAccountDetail, accountDataDetail, setOpenAccountDetail } = props;
  const avatar_url = `${import.meta.env.VITE_BACKEND_URL}${
    accountDataDetail?.profile?.image
  }`;

  const handleOk = () => {
    setOpenAccountDetail(false);
  };
  const handleCancel = () => {
    setOpenAccountDetail(false);
  };
  return (
    <>
      <Modal
        width={1000}
        title={`${accountDataDetail?.profile?.fullname}'s Profile`}
        open={openAccountDetail}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Divider className="bg-gray-300" />
        <div className="mt-[30px] flex gap-[30px]">
          <div>
            <Image
              rootClassName="w-[200px] h-[200px] object-cover overflow-hidden rounded-[100%]"
              src={accountDataDetail?.profile?.image ? avatar_url : Anonymous}
            />
          </div>
          <div className="w-full px -4">
            <Tabs
              defaultActiveKey="1"
              centered
              items={Array.from({ length: 2 }).map((_, i) => {
                const id = String(i + 1);
                return id == "1"
                  ? {
                      label: "Profile",
                      key: id,
                      children: (
                        <ProfileTab accountDataDetail={accountDataDetail} />
                      ),
                    }
                  : {
                      label: "Orders",
                      key: id,
                      children: `Content of Tab Pane ${id}`,
                    };
              })}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalViewDetailAccount;
