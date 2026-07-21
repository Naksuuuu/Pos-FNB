import { memo, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { SORT_BY_OPTIONS, SORT_DATE_OPTIONS, SORT_ROLE_OPTIONS } from "@/Features/Dashboard/User/Constants/UserConstant";
import { SORT_DIRECTION_OPTIONS } from "@/Constants/CommonConstant";
import useTenantTier from "@/Features/Shared/Hooks/useTenantTier";

import useAllUser from "@/Features/Dashboard/User/Hooks/useAllUser";
import useCheckboxUser from "@/Features/Dashboard/User/Hooks/useCheckboxUser";

import { SelectDate } from "@/Components/Elements/Inputs/SelectDate";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { Select } from "@/Components/Elements/Inputs/Select";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

import UserTable from "@/Features/Dashboard/User/Components/Table/UserTable";
import UserModalEdit from "@/Features/Dashboard/User/Components/Modal/UserModalEdit";
import UserModalCreate from "@/Features/Dashboard/User/Components/Modal/UserModalCreate";
import UserModalDelete from "@/Features/Dashboard/User/Components/Modal/UserModalDelete";
import UserModalEditPoint from "@/Features/Dashboard/User/Components/Modal/UserModalEditPoint";
import UserStatistic from "@/Features/Dashboard/User/Components/Statistic/UserStatistic";
import UserModalBulkDelete from "@/Features/Dashboard/User/Components/Modal/UserModalBulkDelete";

const UserPage = memo(() => {
  const { isTenantPro } = useTenantTier();
  const {
    users,
    loading,
    errorMessage,
    statistic,
    pagination,
    filters,
    showReset,
    handlePageChange,
    handleSearchChange,
    handleSortByChange,
    handleSortDirectionChange,
    handleSortRoleChange,
    handleSortDateChange,
    handleResetFilter,
    handlePerPageChange,
  } = useAllUser();

  const { isChecked, setIsChecked, allItemsChecked, handleCheckboxChange, handleAllCheckboxChange } = useCheckboxUser();

  // coupling reset checkbox ketika melakukan filter atau reset filter
  const { page: _page, ...filtersWithoutPage } = filters;
  const filtersKey = JSON.stringify(filtersWithoutPage);
  useEffect(() => {
    setIsChecked([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  // state dan handler untuk modal
  const [selectedEditUser, setSelectedEditUser] = useState(null);
  const [selectedEditPointUser, setSelectedEditPointUser] = useState(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);
  const [selectedCreateUser, setSelectedCreateUser] = useState(false);
  const [selectedBulkDeleteUser, setSelectedBulkDeleteUser] = useState(false);

  const handleOpenDeleteModal = useCallback((userSelected) => {
    setSelectedDeleteUser(userSelected);
  }, []);

  const handleOpenEditModal = useCallback((userSelected) => {
    setSelectedEditUser(userSelected);
  }, []);

  const handleOpenEditPointModal = useCallback((userSelected) => {
    setSelectedEditPointUser(userSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateUser(state);
  }, []);

  const handleOpenBulkDeleteModal = useCallback((state) => {
    setSelectedBulkDeleteUser(state);
  }, []);

  return (
    <>
      <UserStatistic statistic={statistic} />

      <Card className="space-y-4">
        <div className="grid items-end grid-cols-2 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Field>
              <Label htmlFor="search">Cari User</Label>
              <InputSearch id="search" name="search" onSearchChange={handleSearchChange} placeholder="Cari user..." />
            </Field>
          </div>
          <Button onClick={() => handleOpenCreateModal(true)}>
            <Plus />
            Tambah User
          </Button>
        </div>

        <div className="grid items-end grid-cols-2 gap-4 md:grid-cols-4">
          <Field>
            <Label htmlFor="sort_by">Berdasarkan</Label>
            <Select id="sort_by" name="sort_by" items={SORT_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} placeholder="Pilih Berdasarkan" />
          </Field>

          <Field>
            <Label htmlFor="sort_direction">Urutan</Label>
            <Select
              id="sort_direction"
              name="sort_direction"
              items={SORT_DIRECTION_OPTIONS}
              onValueChange={handleSortDirectionChange}
              value={filters.sort_direction || null}
              placeholder="Pilih urutan"
            />
          </Field>

          <Field>
            <Label htmlFor="role">Role</Label>
            <Select id="role" name="role" items={isTenantPro ? SORT_ROLE_OPTIONS : SORT_ROLE_OPTIONS.filter((role) => role.value !== "customer")} onValueChange={handleSortRoleChange} value={filters.role || null} placeholder="Pilih role" />
          </Field>
          <Field>
            <Label htmlFor="date">Tanggal</Label>
            <SelectDate id="date" name="date" items={SORT_DATE_OPTIONS} onValueChange={handleSortDateChange} value={filters.date_filter || null} placeholder="Pilih tanggal" />
          </Field>
        </div>
      </Card>

      <ButtonResetFilter onResetFilter={handleResetFilter} condition={showReset} />
      <div
        className={`grid grid-cols-5 w-full justify-end gap-4 transition-all overflow-hidden h-fit duration-500 ease-out ${allItemsChecked.length > 0 ? "max-h-16 visible opacity-100 translate-y-0" : "max-h-0 invisible m-0 p-0 opacity-0 -translate-y-5 pointer-events-none"}`}
      >
        <Button variant="outline" onClick={() => setIsChecked([])}>
          Batal Pilih
        </Button>
        <Button variant="destructive" className="col-span-4" onClick={() => handleOpenBulkDeleteModal(true)}>
          Hapus {allItemsChecked.length} Data Terpilih?
        </Button>
      </div>

      <Card className="space-y-2 overflow-hidden">
        <UserTable
          loading={loading}
          users={users}
          pagination={pagination}
          handlePageChange={handlePageChange}
          errorMessage={errorMessage}
          onOpenEditModal={handleOpenEditModal}
          onOpenEditPointModal={handleOpenEditPointModal}
          onOpenDeleteModal={handleOpenDeleteModal}
          isChecked={isChecked}
          handleAllCheckboxChange={handleAllCheckboxChange}
          handleCheckboxChange={handleCheckboxChange}
          handlePerPageChange={handlePerPageChange}
          filters={filters}
        />
      </Card>

      {selectedEditUser && <UserModalEdit selectedUser={selectedEditUser} onOpenModal={handleOpenEditModal} />}
      {selectedEditPointUser && <UserModalEditPoint selectedUser={selectedEditPointUser} onOpenModal={handleOpenEditPointModal} />}
      {selectedDeleteUser && <UserModalDelete selectedUser={selectedDeleteUser} onOpenModal={handleOpenDeleteModal} />}
      {selectedCreateUser && <UserModalCreate isOpen={selectedCreateUser} onOpenModal={handleOpenCreateModal} />}
      {selectedBulkDeleteUser && <UserModalBulkDelete isOpen={selectedBulkDeleteUser} onOpenModal={handleOpenBulkDeleteModal} items={allItemsChecked} setIsChecked={setIsChecked} />}
    </>
  );
});

UserPage.displayName = "UserPage";

export default UserPage;
