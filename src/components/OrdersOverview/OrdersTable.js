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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const headCells = [
  { id: "id", label: "ID" },
  { id: "userName", label: "Customer" },
  { id: "productName", label: "Product" },
  { id: "quantity", label: "Quantity" },
  { id: "paymentMethod", label: "Payment" },
  { id: "deliveryMethod", label: "Delivery" },
  { id: "status", label: "Status" },
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
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredOrders = useMemo(() => {
    let filtered = orders;
    if (filterText) {
      filtered = filtered.filter(
        (order) =>
          order.userName.toLowerCase().includes(filterText.toLowerCase()) ||
          order.productName.toLowerCase().includes(filterText.toLowerCase()) ||
          order.userEmail.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    return stableSort(filtered, getComparator(order, orderBy));
  }, [orders, filterText, statusFilter, order, orderBy]);

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          sx={{ width: 200 }}
        />
        <TextField
          label="Status"
          variant="outlined"
          size="small"
          select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ width: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </MenuItem>
          ))}
        </TextField>
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
            {filteredOrders.map((order) => (
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
                <TableCell>{order.deliveryMethod.replace("_", " ")}</TableCell>
                <TableCell>
                  <Typography color={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Typography>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
