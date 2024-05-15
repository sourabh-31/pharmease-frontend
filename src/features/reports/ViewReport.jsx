import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import CustomerRow from "../../ui/CustomerRow";
import styles from "../../styles/ViewReport.module.css";
import Box from "../../ui/Box";

function ViewReport({ onCloseModal, invoice }) {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: invoice,
    disabled: true,
  });
  const { errors } = formState;

  function onSubmit(data) {
    //    console.log(data)
  }

  function onError(errors) {
    // console.error(errors);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className=" max-h-[60vh] overflow-y-auto"
    >
      <div className="flex flex-col gap-4 w-[50rem] mt-6">
        <CustomerRow label="Bill Number" error={errors?.billNo?.message}>
          <input
            type="text"
            id="billNo"
            className={styles.input}
            {...register("billNo", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow label="Name" error={errors?.name?.message}>
          <input
            type="text"
            id="name"
            className={styles.input}
            {...register("name", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow
          label="Mobile Number"
          error={errors?.mobileNumber?.message}
        >
          <input
            type="text"
            id="mobileNumber"
            className={styles.input}
            {...register("mobileNumber", {
              valueAsNumber: true,
              required: "This Field is required",
              validate: {
                isNumber: (value) =>
                  !isNaN(parseFloat(value)) || "Please enter a valid number",
                isTenDigits: (value) =>
                  /^\d{10}$/.test(value) || "Mobile number must be 10 digits",
              },
            })}
          />
        </CustomerRow>

        <CustomerRow label="Address" error={errors?.address?.message}>
          <input
            type="text"
            id="address"
            className={styles.input}
            {...register("address", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow label="Sex" error={errors?.sex?.message}>
          <select
            id="sex"
            className={styles.input}
            {...register("sex", {
              required: "This Field is required",
            })}
          >
            <option value="">Select an option</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </CustomerRow>

        <CustomerRow label="Doctor Name" error={errors?.doctorName?.message}>
          <input
            type="text"
            id="doctorName"
            className={styles.input}
            {...register("doctorName", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow
          label="Doctor Address"
          error={errors?.doctorAddress?.message}
        >
          <input
            type="text"
            id="doctorAddress"
            className={styles.input}
            {...register("doctorAddress", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow label="Date" error={errors?.paidAt?.message}>
          <input
            type="date"
            id="paidAt"
            className={styles.input}
            {...register("paidAt", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow
          label="Mode of Payment"
          error={errors?.modeOfPayment?.message}
        >
          <select
            id="modeOfPayment"
            className={styles.input}
            {...register("modeOfPayment", {
              required: "This Field is required",
            })}
          >
            <option value="">Select an option</option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
        </CustomerRow>

        <CustomerRow label="Medicines">
          {invoice?.medicineInfo?.length ? (
            <div className="flex items-center flex-wrap gap-2 w-[20rem] ml-auto mr-auto my-4">
              {invoice?.medicineInfo?.map((med) => (
                <Box key={med._id} boxName={med.medicineName} disabled="true" />
              ))}
            </div>
          ) : null}
        </CustomerRow>

        <CustomerRow label="Discount" error={errors?.discount?.message}>
          <input
            type="text"
            id="discount"
            className={styles.input}
            {...register("discount", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow label="GST%" error={errors?.gst?.message}>
          <input
            type="text"
            id="gst"
            className={styles.input}
            {...register("gst", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>

        <CustomerRow label="Total Bill (₹)" error={errors?.totalBill?.message}>
          <input
            type="text"
            id="totalBill"
            className={styles.input}
            {...register("totalBill", {
              required: "This Field is required",
            })}
          />
        </CustomerRow>
      </div>

      <div className="flex justify-end mt-12 gap-6">
        <Button
          textColor="#000"
          border={true}
          onClick={onCloseModal}
          type="button"
        >
          Cancel
        </Button>
        <Button bgColor="#03a9f5" type="button">
          <p className="font-medium">Print</p>
        </Button>
      </div>
    </form>
  );
}

export default ViewReport;
