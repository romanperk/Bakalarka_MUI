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
  TablePagination,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const headCells = [
  { id: "id", label: "ID", sortable: true },
  { id: "userName", label: "Customer" },
  { id: "productName", label: "Product" },
  { id: "quantity", label: "Quantity", sortable: true },
  { id: "paymentMethod", label: "Payment" },
  { id: "deliveryMethod", label: "Delivery" },
  { id: "status", label: "Status" },
  { id: "createdAt", label: "Created", sortable: true },
  { id: "actions", label: "Actions" },
];

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const statusOptions = useMemo(
    () => [...new Set(orders.map((o) => o.status))],
    [orders]
  );

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredOrders = useMemo(() => {
    let result = filterText
      ? orders.filter(
          (order) =>
            order.userName.toLowerCase().includes(filterText.toLowerCase()) ||
            order.productName
              .toLowerCase()
              .includes(filterText.toLowerCase()) ||
            order.userEmail.toLowerCase().includes(filterText.toLowerCase()) ||
            String(order.id).includes(filterText)
        )
      : orders;
    if (statusFilter) {
      result = result.filter((order) => order.status === statusFilter);
    }
    if (order && orderBy) {
      result = [...result].sort((a, b) => {
        const comparison =
          a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
        return order === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [orders, filterText, statusFilter, order, orderBy]);

  const paginatedOrders = useMemo(
    () =>
      filteredOrders.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [filteredOrders, page, rowsPerPage]
  );

  const showEmptyState = filteredOrders.length === 0;
  const isFiltered = filterText || statusFilter;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 9 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
              <TextField
                placeholder="Search orders"
                variant="outlined"
                size="small"
                value={filterText}
                onChange={(e) => {
                  setFilterText(e.target.value);
                  setPage(0);
                }}
                fullWidth
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
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
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
                  align={headCell.id === "actions" ? "center" : "left"}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
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
              paginatedOrders.map((order) => (
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
                    <Box sx={{ display: "flex", gap: 1 }}>
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
      {!showEmptyState && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      )}
    </Paper>
  );
};
