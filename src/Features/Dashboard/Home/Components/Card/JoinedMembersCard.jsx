import { useMemo } from "react";
import { format, parseISO, isValid } from "date-fns";
import { id } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/Elements/Shadcn/card";
import { Badge } from "@/Components/Elements/Shadcn/badge";
import { Skeleton } from "@/Components/Elements/Shadcn/skeleton";
import { SelectDate } from "@/Components/Elements/Inputs/SelectDate";
import { UserCheck, UserPlus, Calendar } from "lucide-react";
import useJoinedMembers from "../../Hooks/useJoinedMembers";
import { ANALYTICS_DATE_OPTIONS } from "../../Constants/HomeAnalyticsConstant";

const JoinedMembersCard = () => {
  const { total, members, dateFilter, handleDateFilterChange, loading } = useJoinedMembers();

  const formattedMembers = useMemo(() => {
    return (members || []).map((m) => {
      let formattedDate = m.joined_at;
      try {
        const parsed = parseISO(m.joined_at);
        if (isValid(parsed)) {
          formattedDate = format(parsed, "dd MMM yyyy, HH:mm", { locale: id });
        }
      } catch {
        // fallback date
      }
      return {
        ...m,
        formattedDate,
      };
    });
  }, [members]);

  return (
    <Card className="shadow-sm border-border/80 flex flex-col">
      <CardHeader className="flex flex-col gap-4 pb-4">
        <div className="flex justify-between items-center w-full">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <UserPlus className="size-4 text-primary" /> Member Baru Bergabung
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Daftar pelanggan baru yang terdaftar sebagai member
            </CardDescription>
          </div>

          <Badge variant="secondary" className="text-xs font-bold bg-primary/10 text-primary h-9 px-3">
            Total: {total} Member
          </Badge>
        </div>

        <div className="w-52 sm:w-60">
          {/* SelectDate Dropdown without range restriction */}
          <SelectDate
            id="joined-members-date-filter"
            name="joined-members-date-filter"
            items={ANALYTICS_DATE_OPTIONS}
            placeholder="Pilih Tanggal"
            onValueChange={handleDateFilterChange}
            value={dateFilter}
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={`member-skeleton-${idx}`}
                className="flex items-center justify-between p-3 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-full" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-3 w-24" />
              </div>
            ))}
          </div>
        ) : formattedMembers.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted-foreground italic">
            Belum ada member baru yang bergabung pada rentang tanggal ini.
          </div>
        ) : (
          <div className="space-y-2.5">
            {formattedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/60 hover:bg-muted/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    <UserCheck className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{member.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">@{member.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0 pl-2">
                  <Calendar className="size-3" />
                  <span>{member.formattedDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JoinedMembersCard;
