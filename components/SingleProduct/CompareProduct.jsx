import { BorderAllRounded } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

export default function CompareProduct({ open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button >Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded-lg" sx={style}>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="border px-5 py-2">Picture</td>
                <td className="border px-5 py-2">
                  <img
                    src="https://www.bestelectronics.com.bd/wp-content/uploads/2024/04/as-12tr4ryetd00a-2_copy_1-500x500.jpg"
                    alt="Product 1"
                    className="w-20 h-20"
                  />
                </td>
                <td className="border px-5 py-2">
                  <img
                    src="https://www.bestelectronics.com.bd/wp-content/uploads/2024/04/as-12tr4ryetd00a_copy_1-500x500.jpg"
                    alt="Product 1"
                    className="w-20 h-20"
                  />
                </td>
                <td className="border px-5 py-2">
                  <img
                    src="https://www.bestelectronics.com.bd/wp-content/uploads/2024/04/as-12tr4ryetd00a-2_copy_1-500x500.jpg"
                    alt="Product 1"
                    className="w-20 h-20"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-5 py-2">Product Name</td>
                <td className="border px-5 py-2">Conion BEW-DC24KRNV 2 Ton Inverter (DynaCool) Air Conditioner</td>
                <td className="border px-5 py-2">Conion BEW-DC24KRNV 2 Ton Non Inverter Air Conditioner</td>
                <td className="border px-5 py-2">Conion BEW-DC24KRNV 2 Ton Inverter (DynaCool) Air Conditioner</td>
              </tr>
              <tr>
                <td className="border px-5 py-2">Type</td>
                <td className="border px-5 py-2">Inverter</td>
                <td className="border px-5 py-2">Non Inverter</td>
                <td className="border px-5 py-2">Inverter</td>
              </tr>
              <tr>
                <td className="border px-5 py-2">Capacity</td>
                <td className="border px-5 py-2">2 Ton</td>
                <td className="border px-5 py-2">2 Ton</td>
                <td className="border px-5 py-2">2 Ton</td>
              </tr>
              <tr>
                <td className="border px-5 py-2">Model</td>
                <td className="border px-5 py-2">BEW-DC24KRNV</td>
                <td className="border px-5 py-2">BEW-DC24KRNV</td>
                <td className="border px-5 py-2">BEW-DC24KRNV</td>
              </tr>
              <tr>
                <td className="border px-5 py-2">Brand</td>
                <td className="border px-5 py-2">Conion</td>
                <td className="border px-5 py-2">Conion</td>
                <td className="border px-5 py-2">Conion</td>
              </tr>
              <tr>
                <td className="border px-5 py-2">Heavy Duty Cooling</td>
                <td className="border px-5 py-2">Up To 52°C</td>
                <td className="border px-5 py-2">Up To 52°C</td>
                <td className="border px-5 py-2">Up To 52°C</td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}
