import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

import { SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS, SORT_ROLE_OPTIONS } from "@/Constants/Dashboard/User/UserConstant";

import useAllUser from "@/Hooks/Dashboard/User/useAllUser";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Select } from "@/Components/Elements/Inputs/Select";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";

import UserTable from "@/Components/Fragments/Dashboard/User/Table/UserTable";
import UserModalEdit from "@/Components/Fragments/Dashboard/User/Modal/UserModalEdit";
import UserModalCreate from "@/Components/Fragments/Dashboard/User/Modal/UserModalCreate";
import UserModalDelete from "@/Components/Fragments/Dashboard/User/Modal/UserModalDelete";
import UserStatistic from "@/Components/Fragments/Dashboard/User/Statistic/UserStatistic";

const UserPage = memo(() => {
  const { filters, updateFilters, resetFilters } = useFilterParams();
  const { users, loadUsers, loading, errorMessage, pagination, statistic } = useAllUser();

  const [selectedCreateUser, setSelectedCreateUser] = useState(null);
  const [selectedEditUser, setSelectedEditUser] = useState(null);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);

  const search = filters.search || "";
  const [optimisticSearch, setOptimisticSearch] = useState(search);

  useEffect(() => {
    setOptimisticSearch(search);
  }, [search]);

  const showReset = !!(filters.sort_by || filters.sort_direction || search || filters.role);

  useEffect(() => {
    loadUsers(filters);
  }, [filters, loadUsers]);

  const handlePageChange = useCallback(
    (page) => {
      updateFilters({ page });
    },
    [updateFilters],
  );

  const timerRef = useRef(null);
  const handleSearchChange = useCallback(
    (e) => {
      setOptimisticSearch(e.target.value);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        updateFilters({ search: e.target.value, page: 1 });
      }, 300);
    },
    [updateFilters],
  );

  const handleSortByChange = useCallback(
    (e) => {
      updateFilters({ sort_by: e, page: 1 });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e, page: 1 });
    },
    [updateFilters],
  );
  const handleSortRoleChange = useCallback(
    (e) => {
      updateFilters({ role: e, page: 1 });
    },
    [updateFilters],
  );

  const handleResetFilter = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleOpenDeleteModal = useCallback((userSelected) => {
    setSelectedDeleteUser(userSelected);
  }, []);

  const handleOpenEditModal = useCallback((userSelected) => {
    setSelectedEditUser(userSelected);
  }, []);

  const handleOpenCreateModal = useCallback((state) => {
    setSelectedCreateUser(state);
  }, []);

  return (
    <>
      <UserStatistic statistic={statistic} />

      <Card>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="col-span-full grid grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <Field>
                <Label htmlFor="search">Cari User</Label>
                <InputSearch id="search" name="search" onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari user..." />
              </Field>
            </div>
            <Button onClick={() => handleOpenCreateModal(true)}>
              <Plus />
              Tambah User
            </Button>
          </div>

          <Field>
            <Label htmlFor="sort_by">Berdasarkan</Label>
            <Select id="sort_by" name="sort_by" items={SORT_BY_OPTIONS} onValueChange={handleSortByChange} value={filters.sort_by || null} label="Berdasarkan" placeholder="Pilih Berdasarkan" />
          </Field>

          <Field>
            <Label htmlFor="role">Role</Label>
            <Select id="role" name="role" items={SORT_ROLE_OPTIONS} onValueChange={handleSortRoleChange} value={filters.role || null} label="Role" placeholder="Pilih role" />
          </Field>

          <Field>
            <Label htmlFor="sort_direction">Urutan</Label>
            <Select
              id="sort_direction"
              name="sort_direction"
              items={SORT_DIRECTION_OPTIONS}
              onValueChange={handleSortDirectionChange}
              value={filters.sort_direction || null}
              label="Urutan"
              placeholder="Pilih urutan"
            />
          </Field>
        </div>
      </Card>

      <ButtonResetFilter onResetFilter={handleResetFilter} condition={showReset} />

      <Card className="overflow-hidden space-y-2">
        <UserTable
          loading={loading}
          users={users}
          pagination={pagination}
          handlePageChange={handlePageChange}
          errorMessage={errorMessage}
          loadUsers={loadUsers}
          onOpenEditModal={handleOpenEditModal}
          onOpenDeleteModal={handleOpenDeleteModal}
        />
      </Card>

      {selectedEditUser && <UserModalEdit selectedUser={selectedEditUser} onOpenModal={handleOpenEditModal} />}
      {selectedCreateUser && <UserModalCreate isOpen={selectedCreateUser} onOpenModal={handleOpenCreateModal} />}
      {selectedDeleteUser && <UserModalDelete selectedUser={selectedDeleteUser} onOpenModal={handleOpenDeleteModal} />}
    </>
  );
});

UserPage.displayName = "UserPage";

export default UserPage;
