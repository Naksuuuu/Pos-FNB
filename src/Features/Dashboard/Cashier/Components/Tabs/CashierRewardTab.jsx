import { useState } from "react";
import { format } from "date-fns";
import { Award, CheckCircle2, Clock, Gift, XCircle } from "lucide-react";

import { PER_PAGE_OPTIONS, SORT_DIRECTION_OPTIONS } from "@/Constants/CommonConstant";
import { CLAIM_STATUS_OPTIONS, TABLE_REWARD_CLAIM_HEAD_COLUMNS } from "@/Features/Dashboard/Cashier/Constants/CashierConstant";
import useCashierRewardClaims from "@/Features/Dashboard/Cashier/Hooks/useCashierRewardClaims";

import { Card } from "@/Components/Elements/Cards/Card";
import { Button } from "@/Components/Elements/Shadcn/button";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { InputSearch } from "@/Components/Elements/Inputs/InputSearch";
import { Select } from "@/Components/Elements/Inputs/Select";
import { ButtonResetFilter } from "@/Components/Elements/Buttons/ButtonResetFilter";
import { Field } from "@/Components/Elements/Shadcn/field";
import { Label } from "@/Components/Elements/Shadcn/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Elements/Shadcn/table";
import { Pagination } from "@/Components/Elements/Paginations/Pagination";

import DashStatisticCard from "@/Features/Dashboard/Shared/Component/Card/DashStatisticCard";
import DashTableError from "@/Features/Dashboard/Shared/Component/Table/DashTableError";
import DashTableLoading from "@/Features/Dashboard/Shared/Component/Table/DashTableLoading";
import DashModalConfirmation from "@/Features/Dashboard/Shared/Component/Modal/DashModalConfirmation";

const CashierRewardTab = () => {
  const {
    claims,
    loading,
    errorMessage,
    statistic,
    pagination,
    filters,
    showReset,
    optimisticSearch,
    handlePageChange,
    handleSearchChange,
    handleStatusChange,
    handleSortDirectionChange,
    handlePerPageChange,
    handleResetFilter,
    approveClaim,
    rejectClaim,
    isApproving,
    isRejecting,
    activeClaimId,
  } = useCashierRewardClaims();

  const [selectedApproveClaim, setSelectedApproveClaim] = useState(null);
  const [selectedRejectClaim, setSelectedRejectClaim] = useState(null);

  const handleConfirmApprove = (claimId) => {
    approveClaim(claimId, {
      onSuccess: () => setSelectedApproveClaim(null),
    });
  };

  const handleConfirmReject = (claimId) => {
    rejectClaim(claimId, {
      onSuccess: () => setSelectedRejectClaim(null),
    });
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
            Pending
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            Completed
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-500/30">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || "-"}</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {/* Sidebar Statistic & Filters */}
      <div className="space-y-4">
        <Card className="space-y-4">
          <div>
            <h2 className="font-semibold">Statistik Klaim Merchandise</h2>
          </div>
          <DashStatisticCard
            title="Total Klaim"
            statistic={statistic.total_claims}
            descriptions="Semua riwayat klaim merchandise"
            icon={Gift}
          />
          <DashStatisticCard
            title="Perlu Persetujuan"
            statistic={statistic.pending_count}
            descriptions="Klaim menunggu verifikasi kasir"
            icon={Clock}
            variant={statistic.pending_count > 0 ? "default" : "secondary"}
          />
        </Card>

        <Card className="space-y-4">
          <div>
            <h2 className="font-semibold">Cari dan Filter</h2>
          </div>
          <Field>
            <Label htmlFor="search">Cari Klaim</Label>
            <InputSearch
              id="search"
              name="search"
              onSearchChange={handleSearchChange}
              value={optimisticSearch}
              placeholder="Cari nama pelanggan / reward..."
            />
          </Field>

          <Field>
            <Label htmlFor="status">Status Klaim</Label>
            <Select
              id="status"
              name="status"
              items={CLAIM_STATUS_OPTIONS}
              value={filters.status || ""}
              placeholder="Pilih Status"
              onValueChange={handleStatusChange}
            />
          </Field>

          <Field>
            <Label htmlFor="sort_direction">Arah Urutan</Label>
            <Select
              id="sort_direction"
              name="sort_direction"
              items={SORT_DIRECTION_OPTIONS}
              value={filters.sort_direction || ""}
              placeholder="Pilih Arah Urutan"
              onValueChange={handleSortDirectionChange}
            />
          </Field>
        </Card>

        <ButtonResetFilter condition={showReset} onResetFilter={handleResetFilter} />
      </div>

      {/* Main Content Table */}
      <div className="space-y-4 xl:col-span-2">
        <Card className="space-y-2 overflow-hidden p-0">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Award className="size-5 text-primary" /> Daftar Klaim Merchandise
            </h2>
          </div>

          <Table className="min-w-full border-b">
            <TableHeader>
              <TableRow>
                {TABLE_REWARD_CLAIM_HEAD_COLUMNS.map((col) => (
                  <TableHead key={col.header} className={col.width}>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && !errorMessage && (
                <DashTableLoading
                  rows={10}
                  columns={TABLE_REWARD_CLAIM_HEAD_COLUMNS.length}
                  actionCountLoading={2}
                />
              )}
              {errorMessage && !loading && <DashTableError message={errorMessage} />}
              {!loading && !errorMessage && claims.length < 1 && (
                <DashTableError message="Belum ada data klaim merchandise" />
              )}
              {!loading &&
                !errorMessage &&
                claims.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{pagination?.from ? pagination.from + index : index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{item.user?.name || "Customer"}</p>
                        {item.user?.username && (
                          <p className="text-xs text-muted-foreground">@{item.user.username}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{item.reward?.name || "-"}</p>
                        {item.reward?.code && (
                          <p className="text-xs text-muted-foreground">{item.reward.code}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-primary">
                      {item.point_used ? `${item.point_used} Pts` : "-"}
                    </TableCell>
                    <TableCell className="text-xs">
                      {item.redeemed_at ? (
                        format(new Date(item.redeemed_at), "dd MMM yyyy HH:mm")
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{renderStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                      {item.notes || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.status === "PENDING" ? (
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                            onClick={() => setSelectedApproveClaim(item)}
                            disabled={isApproving || isRejecting}
                          >
                            <CheckCircle2 className="size-4" />
                            <span>Setujui</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-rose-500/30 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            onClick={() => setSelectedRejectClaim(item)}
                            disabled={isApproving || isRejecting}
                          >
                            <XCircle className="size-4" />
                            <span>Tolak</span>
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Selesai</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center px-4 py-3 border-t">
            <div className="flex items-center gap-2">
              <p className="text-nowrap text-sm text-muted-foreground">Data per halaman</p>
              <Select
                id="per-page"
                name="per-page"
                items={PER_PAGE_OPTIONS}
                value={filters.per_page || 15}
                onValueChange={(value) => handlePerPageChange(Number(value))}
              />
            </div>
            <Pagination pagination={pagination} onPageChange={handlePageChange} align="end" />
          </div>
        </Card>
      </div>

      {/* Confirmation Modals */}
      {selectedApproveClaim && (
        <DashModalConfirmation
          isOpen={!!selectedApproveClaim}
          title={`Setujui Klaim ${selectedApproveClaim.reward?.name || "Merchandise"}?`}
          description={`Pelanggan ${selectedApproveClaim.user?.name || ""} akan menerima hadiah ini dan poin sebesar ${selectedApproveClaim.point_used} Pts telah terpotong.`}
          onOpenModal={() => setSelectedApproveClaim(null)}
          loading={isApproving && activeClaimId === selectedApproveClaim.id}
          handleDelete={() => handleConfirmApprove(selectedApproveClaim.id)}
          id={selectedApproveClaim.id}
          icon={CheckCircle2}
          confirmLabel="Setujui Klaim"
          variant="default"
        />
      )}

      {selectedRejectClaim && (
        <DashModalConfirmation
          isOpen={!!selectedRejectClaim}
          title={`Tolak Klaim ${selectedRejectClaim.reward?.name || "Merchandise"}?`}
          description={`Klaim dari ${selectedRejectClaim.user?.name || ""} akan ditolak. Poin pelanggan dapat diperhitungkan kembali sesuai kebijakan.`}
          onOpenModal={() => setSelectedRejectClaim(null)}
          loading={isRejecting && activeClaimId === selectedRejectClaim.id}
          handleDelete={() => handleConfirmReject(selectedRejectClaim.id)}
          id={selectedRejectClaim.id}
          icon={XCircle}
          confirmLabel="Tolak Klaim"
          variant="destructive"
        />
      )}
    </div>
  );
};

export default CashierRewardTab;
