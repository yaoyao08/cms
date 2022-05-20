import {
  AppstoreOutlined,
  UnorderedListOutlined,
  FormOutlined,
  ApartmentOutlined,
  MailOutlined,
} from "@ant-design/icons";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const menus = [
  getItem("文章列表", "/list", <UnorderedListOutlined />),
  getItem("编辑", "/edit", <FormOutlined />),
  getItem("素材管理", "/material", <ApartmentOutlined />),
  getItem("测试菜单组", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];
