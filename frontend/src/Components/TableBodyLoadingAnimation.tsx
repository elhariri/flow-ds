function TableAnimatedRow() {
  return (
    <tr>
      <div className="h-2 bg-zinc-200 rounded-full w-20 animate-pulse " />
    </tr>
  );
}

export default function TableBodyLoadingAnimation() {
  return (
    <tbody data-testid="table-body-loader">
      <TableAnimatedRow />
      <TableAnimatedRow />
    </tbody>
  );
}
