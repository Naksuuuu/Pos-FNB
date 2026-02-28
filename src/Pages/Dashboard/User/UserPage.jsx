import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

import { SORT_BY_OPTIONS, SORT_DIRECTION_OPTIONS } from "@/Constants/Dashboard/User/UserConstant";

import useAllUser from "@/Hooks/Dashboard/User/useAllUser";
import useFilterParams from "@/Hooks/Common/useFilterParams";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Select } from "@/Components/Elements/Inputs/Select";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
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

  const showReset = !!(filters.sort_by || filters.sort_direction || search);

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
      updateFilters({ sort_by: e });
    },
    [updateFilters],
  );

  const handleSortDirectionChange = useCallback(
    (e) => {
      updateFilters({ sort_direction: e });
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
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <InputSearch onSearchChange={handleSearchChange} value={optimisticSearch} placeholder="Cari user..." />

          <Button onClick={() => handleOpenCreateModal(true)}>
            <Plus />
            Tambah User
          </Button>

          <Select
            items={SORT_BY_OPTIONS}
            onValueChange={handleSortByChange}
            value={filters.sort_by || null}
            label="Urutkan Berdasarkan"
            placeholder="Pilih opsi"
          />

          <Select
            items={SORT_DIRECTION_OPTIONS}
            onValueChange={handleSortDirectionChange}
            value={filters.sort_direction || null}
            label="Urutan"
            placeholder="Pilih urutan"
          />
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
