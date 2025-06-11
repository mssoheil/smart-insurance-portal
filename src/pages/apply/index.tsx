// UI frameworks
import { Divider, Empty, Spin } from "antd";
// Shared components
import { FormGenerator } from "@root/components/form-generator";
// Hooks
import { useApply } from "@root/pages/apply/index.hook";

const ApplyPage = () => {
  const {
    loading,
    calledAPiRef,
    formStructure,
    handlers: { handleSubmit },
  } = useApply();

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <>
      {!formStructure?.length && calledAPiRef.current ? (
        <Empty description="No form found" />
      ) : (
        formStructure.map((form, index, array) => (
          <div key={form.formId}>
            <FormGenerator formData={form} onSubmit={handleSubmit} />
            {index !== array.length - 1 && <Divider />}
          </div>
        ))
      )}
    </>
  );
};

export default ApplyPage;
