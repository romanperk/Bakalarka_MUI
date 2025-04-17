import React, { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  TableContainer,
  Typography,
  IconButton,
  TableSortLabel,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const headCells = [
  { id: "id", label: "ID" },
  { id: "userName", label: "Customer", disableSort: true },
  { id: "productName", label: "Product", disableSort: true },
  { id: "quantity", label: "Quantity" },
  { id: "paymentMethod", label: "Payment", disableSort: true },
  { id: "deliveryMethod", label: "Delivery", disableSort: true },
  { id: "status", label: "Status", disableSort: true },
  { id: "createdAt", label: "Created" },
  { id: "actions", label: "Actions", disableSort: true },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, idx) => [el, idx]);
  stabilized.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

export const OrdersTable = ({
  orders,
  handleEditExistingOrder,
  getStatusColor,
  formatDate,
  handleCompleteOrder,
  handleDeleteClick,
}) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptions = useMemo(
    () => Array.from(new Set(orders.map((o) => o.status))),
    [orders]
  );

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    const isDesc = orderBy === property && order === "desc";

    if (isDesc) {
      setOrder(null);
      setOrderBy(null);
    } else if (isAsc) {
      setOrder("desc");
      setOrderBy(property);
    } else {
      setOrder("asc");
      setOrderBy(property);
    }
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (filterText) {
      const searchText = filterText.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.userName.toLowerCase().includes(searchText) ||
          order.productName.toLowerCase().includes(searchText) ||
          order.userEmail.toLowerCase().includes(searchText) ||
          String(order.id).includes(searchText)
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    return order && orderBy
      ? stableSort(filtered, getComparator(order, orderBy))
      : filtered;
  }, [orders, filterText, statusFilter, order, orderBy]);

  const showEmptyState = filteredOrders.length === 0;
  const isFiltered = filterText || statusFilter;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 9 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SearchIcon
                sx={{ color: "text.secondary", fontSize: 20, mr: 1 }}
              />
              <TextField
                placeholder="Search orders"
                variant="outlined"
                size="small"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                sx={{ width: "100%" }}
                InputProps={{
                  sx: { pl: 0 },
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              label="Status"
              variant="outlined"
              size="small"
              select
              fullWidth
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  align={headCell.id === "actions" ? "center" : "left"}
                >
                  {headCell.disableSort ? (
                    headCell.label
                  ) : (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {showEmptyState ? (
              <TableRow>
                <TableCell
                  colSpan={headCells.length}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {isFiltered
                      ? "No matching orders found"
                      : "No orders available"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isFiltered
                      ? "Try adjusting your search or filter criteria"
                      : "Create a new order to get started"}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.userName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.userEmail}
                    </Typography>
                  </TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.paymentMethod.replace("_", " ")}</TableCell>
                  <TableCell>
                    {order.deliveryMethod.replace("_", " ")}
                  </TableCell>
                  <TableCell>
                    <Typography color={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditExistingOrder(order)}
                        title="Edit order"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      {order.status !== "completed" && (
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleCompleteOrder(order.id)}
                          title="Mark as completed"
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(order)}
                        title="Delete order"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
