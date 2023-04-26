import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUP from "./components/SignUP";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import UserTable from "./components/UserTable";
import UploadTable from "./components/UploadTable";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<SignUP />}></Route>
          <Route exact path="/signIn" element={<SignIn />}></Route>
          <Route exact path="/usertable" element={<UserTable />}></Route>
          <Route exact path="/uploadedtable" element={<UploadTable />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
