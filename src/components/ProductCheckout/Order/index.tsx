import { FC } from "react";
import { Checkbox, Descriptions } from "antd";
import Button from "../../../generic/Button";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { setConfirmationModalVisibility } from "../../../redux/modalSlice";
import Card from "./Card";

const Order: FC = () => {
  const { data, total, coupon } = useReduxSelector((state) => state.shopping);
  const dispatch = useReduxDispatch();

  return (
    <div className="w-[40%] max-md:w-[100%]">
      <h3 className="font-bold mb-[20px]">Your Order</h3>
      <div className="flex flex-col gap-3">
        {data.map((value) => (
          <Card key={value._id} {...value} />
        ))}
      </div>
      <Descriptions className="mt-[30px]">
        <Descriptions.Item span={3} label="Subtotal">
          ${total || 0}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Coupon Discount">
          - $(
          {coupon.has_coupon
            ? Number(total * Number(`0.${coupon.discount_for}`)).toFixed(2)
            : "0.00"}
          )
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Shiping">
          $16
        </Descriptions.Item>
      </Descriptions>
      <div className="flex justify-between">
        <h1>Total</h1>
        {coupon.has_coupon ? (
          <div>
            <h1 className="text-[#46A358] line-through">${total || 0}</h1>
            <h1 className="text-[#46A358]">
              $
              {Number(
                total - Number(total * Number(`0.${coupon.discount_for}`)),
              ).toFixed(2) || 0}
            </h1>
          </div>
        ) : (
          <h1 className="text-[#46A358]">${total || 0}</h1>
        )}
      </div>
      <div className="mt-[47px] flex flex-col gap-4">
        <h3 className="font-bold mb-[20px]">Payment Method</h3>
        <Checkbox className="border border-[#46A358] w-full h-[40px] flex items-center pl-[10px] rounded-lg">
          Hey
        </Checkbox>
        <Checkbox
          name="payment_method"
          className="border border-[#46A358] w-full h-[40px] flex items-center pl-[10px] rounded-lg"
        >
          Dorect bank transfer
        </Checkbox>
        <Checkbox
          name="payment_method"
          className="border border-[#46A358] w-full h-[40px] flex items-center pl-[10px] rounded-lg"
        >
          Cash on delivery
        </Checkbox>
      </div>
      <Button
        onClick={() => dispatch(setConfirmationModalVisibility())}
        className="mt-[40px] w-full h-[40px]"
      >
        Place Order
      </Button>
    </div>
  );
};

export default Order;
