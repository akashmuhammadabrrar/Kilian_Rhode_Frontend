import Footer from "../FooterAdmin";
import Title from "../Title";
import CMStabCounter from "@/components/admin/cms/CMStabCounter";

// --- Main App Component ---
const App = () => {
  return (
    <>
      {" "}
      <div className="p-4 sm:p-8 w-full bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-6">
          <Title
            text="Content Management System"
            paragraph="Manage your website content, contact information, and customer-facing pages"
          />
        </div>
        <div>
          <CMStabCounter />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
