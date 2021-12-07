import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Box, Paper, Alert } from "@mui/material";
import Chart from "../../components/admin/Chart";
import { getUserStats } from "../../actions/userActions";
import AdminSidenav from "../../components/AdminSidenav";
import NewUsersComponent from "../../components/admin/NewUsersComponent";
import LatestOrdersComponent from "../../components/admin/LatestOrdersComponent";
import RevenueComponent from "../../components/admin/RevenueComponent";

const DashboardScreen = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    !userInfo && navigate("/login?redirect=/admin");
    userInfo && !userInfo.isAdmin && navigate("/");

    const getStats = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(`/api/users/stats`, config);

        data.map((item) =>
          setUserData((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {
        if (err) {
          setMessage(err);
        }
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <Box sx={{ minHeight: "85vh" }}>
      <Typography
        variant="h4"
        sx={{ my: 3, paddingLeft: "1rem" }}
        align="center"
      >
        ShopMart Admin
      </Typography>
      {message && <Alert severity="error">{message}</Alert>}
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          md={2}
          sx={{ marginLeft: "0.5rem", backgroundColor: "#F2F2F5" }}
        >
          <AdminSidenav />
        </Grid>
        <Grid item xs={6} md={9}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <RevenueComponent />
            <Paper elevation={3} sx={{ padding: "2rem", width: "30%" }}>
              <Typography variant="h5">Revenue</Typography>
              <Typography
                component="p"
                variant="p"
                sx={{ fontSize: 30, my: 2 }}
              >
                $3218
              </Typography>
              <Typography component="p" variant="p" className="text-light">
                Compared to Last Month
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: "2rem", width: "30%" }}>
              <Typography variant="h5">Revenue</Typography>
              <Typography
                component="p"
                variant="p"
                sx={{ fontSize: 30, my: 2 }}
              >
                $3218
              </Typography>
              <Typography component="p" variant="p" className="text-light">
                Compared to Last Month
              </Typography>
            </Paper>
          </Box>
          <Chart
            data={userData}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Paper elevation={3} sx={{ padding: "2rem", width: "30%" }}>
              <Typography
                variant="p"
                sx={{ fontWeight: 600, fontSize: 20, mb: 3 }}
              >
                Newly Joined Members
              </Typography>
              <NewUsersComponent />
            </Paper>
            <Paper elevation={3} sx={{ padding: "2rem", width: "60%" }}>
              <Typography
                variant="p"
                sx={{ fontWeight: 600, fontSize: 20, mb: 3 }}
              >
                Latest Orders
              </Typography>
              <LatestOrdersComponent />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardScreen;
