import React from "react";
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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

export const OrdersTable = ({
  orders,
  handleEditExistingOrder,
  getStatusColor,
  formatDate,
  handleCompleteOrder,
  handleDeleteClick,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Payment</TableCell>
            <TableCell>Delivery</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
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
              <TableCell>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
