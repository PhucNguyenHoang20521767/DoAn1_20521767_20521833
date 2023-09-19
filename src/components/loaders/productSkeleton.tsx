import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ProductSkeleton() {
  return (
    <Stack spacing={1}>
      {/* <Skeleton variant="rectangular" width={128} height={60} sx={{ marginTop: 3, marginRight: 1 }}/> */}
      {Array.from({ length: 4 }).map((_, indexTwo) => (
        <Skeleton
          key={indexTwo}
          variant="rectangular"
          width={100}
          height={60}
        />
      ))}
    </Stack>
  );
}
