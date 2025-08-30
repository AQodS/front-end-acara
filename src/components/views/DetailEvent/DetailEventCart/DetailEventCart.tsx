import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";

interface PropTypes {
  cart: ICart;
  dataTicketInCart: ITicket;
  onChangeQuantity: (type: "increment" | "decrement") => void;
}

const DetailEventCart = (props: PropTypes) => {
  const { cart, dataTicketInCart, onChangeQuantity } = props;
  return (
    <Card radius="lg" className="border-none lg:sticky lg:top-[80px]">
      <CardBody className="gap-2">
        <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
        {cart.ticket === "" ? (
          <p className="text-foreground-500">Your cart is empty</p>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-bold">{dataTicketInCart?.name}</h4>
              <div className="flex items-center gap-2">
                <Button
                  size="md"
                  variant="bordered"
                  color="danger"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("decrement")}
                >
                  -
                </Button>
                <span className="text-lg font-bold">{cart.quantity}</span>
                <Button
                  size="md"
                  variant="bordered"
                  color="danger"
                  className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                  onPress={() => onChangeQuantity("increment")}
                >
                  +
                </Button>
              </div>
            </div>
            <p className="font-bold">
              {convertIDR(Number(dataTicketInCart?.price) * cart.quantity)}
            </p>
          </div>
        )}
        <Divider />
      </CardBody>
      <CardFooter>
        <Button
          color="danger"
          fullWidth
          size="md"
          disabled={cart.quantity === 0}
          className="disabled:bg-danger-200"
        >
          Check Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetailEventCart;
