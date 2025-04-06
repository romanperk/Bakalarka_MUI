import React, { useState } from "react";
import { useOrders } from "../context/ordersContext";
import { Button, Paper, Box, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { OrdersTable } from "../components/OrdersOverview/OrdersTable";
import { EditOrderModal } from "../components/OrdersOverview/Modals/EditOrderModal";
import { ConfirmDeleteDialog } from "../components/OrdersOverview/Modals/ConfirmDeleteDialog";

const OrdersOverview = () => {
  const navigate = useNavigate();
  const { orders, editOrder, completeOrder, deleteOrder } = useOrders();
  const [editingOrder, setEditingOrder] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleOpenModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditingOrder(null);
  };

  const handleEditExistingOrder = (order) => {
    setEditingOrder(order);
    handleOpenModal();
  };

  const handleSaveEditedOrder = () => {
    editOrder(editingOrder);
    handleCloseEditModal();
  };

  const handleCompleteOrder = (orderId) => {
    completeOrder(orderId);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteOrder(orderToDelete.id);
    setDeleteConfirmOpen(false);
    setOrderToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setOrderToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success.main";
      case "processing":
        return "info.main";
      case "pending":
        return "warning.main";
      default:
        return "text.primary";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5">Orders</Typography>
        <Button
          onClick={() => navigate("/new-order")}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New Order
        </Button>
      </Box>
      <OrdersTable
        orders={orders}
        handleEditExistingOrder={handleEditExistingOrder}
        handleCompleteOrder={handleCompleteOrder}
        getStatusColor={getStatusColor}
        handleDeleteClick={handleDeleteClick}
        formatDate={formatDate}
      />
      <EditOrderModal
        modalOpen={editModalOpen}
        handleCloseModal={handleCloseEditModal}
        editingOrder={editingOrder}
        setEditingOrder={setEditingOrder}
        handleSaveEditedOrder={handleSaveEditedOrder}
      />
      <ConfirmDeleteDialog
        modalOpen={deleteConfirmOpen}
        handleCancelDelete={handleCancelDelete}
        orderToDelete={orderToDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Paper>
  );
};

export default OrdersOverview;
