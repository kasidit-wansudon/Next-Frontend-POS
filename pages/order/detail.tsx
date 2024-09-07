import React from "react";
import { Listbox, ListboxItem, Chip, ScrollShadow, Avatar } from "@nextui-org/react";
import { users } from "./data.js";
import DefaultLayout from "@/layouts/default";
import { PageEnum } from "@/constant/enum/enum";
import { useRouter } from "next/router.js";
import Counter from "@/components/counter";
import { OrderItemModel, OrderModel } from "@/constant/models/order.model";
import { send } from "process";

export default function OrderDetail() {
  const countItems: number[] = [];
  const router = useRouter();
  const { keys, name } = router.query; // รับข้อมูลจาก query parameters

  const [values, setValues] = React.useState(new Set(keys));

  const arrayValues: string[] = (keys ?? []) as string[];
  console.log(keys);
  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return [];
    }

    return arrayValues.map((value) => {
      console.log(value);
      const user = users.find((user) => `${user.id}` === `${value}`);
      return user ? (
        <Chip key={value}>{user.name}</Chip>
      ) : null;
    });
  }, [arrayValues.length]);

  const createOrder = () => {
    const createOrder: OrderModel = { id: 0, table: 1, price: 100, items: 5 };
    let orderId: number = 0;
    send(orderId).then((res) => {
      if (res.status === 200) {
        orderId = res.body.id;
        const createOrderItems: OrderItemModel[] = arrayValues.map((key) => ({
          id: 0, // ค่าเริ่มต้นของ id
          orderId: orderId, // ใช้ key จาก keys
          price: 100, // กำหนดราคาเริ่มต้น
          quantity: countItems[Number(key)] ?? 0, // กำหนดจำนวนเริ่มต้น
        }));
        console.log(createOrder, createOrderItems);
      }
    });

  };

  return (
    <DefaultLayout title={PageEnum.FoodList} props={{ callback: createOrder }}>
      {topContent.map((item, index) => (
        <div key={index} className="flex gap-2 items-center w-full justify-between">
          <div className="w-full gap-2 flex">
            <Avatar alt={item?.props.children} className="flex-shrink-0" size="sm" src={users.find((user) => user.name === item?.props.children)?.avatar} />
            <div className="flex flex-col">
              <span className="text-small">{item?.props.children}</span>
              <span className="text-tiny text-default-400">{users.find((user) => user.name === item?.props.children)?.email}</span>
            </div>
          </div>
          <Counter callback={(value: number) => { countItems[Number(arrayValues[index])] = value; console.log(value); }} />
        </div>
      ))}
    </DefaultLayout>
  );
}
