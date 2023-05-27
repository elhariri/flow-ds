function TableAnimatedRow() {
  return (
    <tr className="h-14 flex w-full ml-4">
      <td className="flex">
        <div className="h-4 my-auto bg-zinc-100 rounded-full w-80 animate-pulse mx-2" />
      </td>
      <td className="flex">
        <div className="h-4 my-auto bg-zinc-100 rounded-full w-40 animate-pulse mr-2" />
      </td>
      <td className="flex">
        <div className="h-4 my-auto bg-zinc-100 rounded-full w-36 animate-pulse mr-2" />
      </td>
      <td className="flex">
        <div className="h-4 my-auto bg-zinc-100 rounded-full w-32 animate-pulse mr-2" />
      </td>
      <td className="flex">
        <div className="h-4 my-auto bg-zinc-100 rounded-full w-20 animate-pulse mr-2" />
      </td>
      <td className="flex">
        <div className="h-4 my-auto bg-zinc-100 rounded-full w-10 animate-pulse " />
      </td>
    </tr>
  );
}

export default function TableBodyLoadingAnimation() {
  return (
    <tbody data-testid="table-body-loader">
      <TableAnimatedRow />
      <TableAnimatedRow />
      <TableAnimatedRow />
      <TableAnimatedRow />
    </tbody>
  );
}
