import ProfileRow from "../../ui/ProfileRow";
import styles from "../../styles/UserInfo.module.css";
import { useUpdateUser, useUser } from "../authentication/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

function UserInfo() {
  const { isLoading, user } = useUser();

  const [toggleField, setToggleField] = useState(true);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: user.user,
    disabled: toggleField,
  });
  const { errors } = formState;

  const { isUpdating, updateUser } = useUpdateUser();

  function onSubmit(data) {
    // console.log(data);
    updateUser(data);
  }

  function onError(errors) {
    // console.error(errors);
  }

  if (isLoading) return <Spinner />;

  return (
    <section className="mt-12 ml-4">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <ProfileRow label="First Name" error={errors?.ownerFirstName?.message}>
          <input
            type="text"
            id="ownerFirstName"
            className={styles.input}
            {...register("ownerFirstName", {
              required: "This Field is required",
            })}
          />
        </ProfileRow>

        <ProfileRow label="Last Name" error={errors?.ownerLastName?.message}>
          <input
            type="text"
            id="ownerLastName"
            className={styles.input}
            {...register("ownerLastName", {
              required: "This Field is required",
            })}
          />
        </ProfileRow>

        <ProfileRow label="Pharmacy Name" error={errors?.pharmacyName?.message}>
          <input
            type="text"
            id="pharmacyName"
            className={styles.input}
            {...register("pharmacyName", {
              required: "This Field is required",
            })}
          />
        </ProfileRow>

        <ProfileRow label="Full Address" error={errors?.address?.message}>
          <input
            type="text"
            id="address"
            className={styles.input}
            {...register("address", {
              required: "This Field is required",
            })}
          />
        </ProfileRow>

        <ProfileRow label="Drug License No.">
          <input
            type="text"
            id="dlNo"
            className={styles.input}
            {...register("dlNo", {
              required: "This Field is required",
            })}
          />
        </ProfileRow>

        <ProfileRow label="Gst No.">
          <input
            type="text"
            id="gstNo"
            className={styles.input}
            {...register("gstNo", {
              required: "This Field is required",
            })}
          />
        </ProfileRow>

        <ProfileRow>
          {!toggleField && (
            <Button
              textColor="#000"
              border={true}
              onClick={() => setToggleField(true)}
              type="button"
              disabled={isUpdating}
            >
              Cancel
            </Button>
          )}

          {toggleField && (
            <Button
              bgColor="#03a9f5"
              onClick={() => setToggleField(false)}
              type="button"
            >
              Update
            </Button>
          )}

          {!toggleField && (
            <Button
              bgColor="#01a768"
              onClick={() => setToggleField(false)}
              type="submit"
              disabled={isUpdating}
            >
              Confirm
            </Button>
          )}
        </ProfileRow>
      </form>
    </section>
  );
}

export default UserInfo;
