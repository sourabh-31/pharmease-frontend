import PageNotFoundNav from "../ui/PageNotFoundNav";

function PageNotFound() {
  return (
    <section className="mx-20 my-6">
      <PageNotFoundNav />
      <p className="ml-auto mr-auto text-center text-4xl font-semibold w-[60%] mt-[14rem]">
        Oops! The page you&apos;re looking for doesn&apos;t seem to exist.
      </p>
    </section>
  );
}

export default PageNotFound;
