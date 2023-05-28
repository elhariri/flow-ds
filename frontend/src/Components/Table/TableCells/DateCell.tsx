export default function DateCell({ date }: { date: string }) {
  return (
    <>
      <td className="hidden md:table-cell font-semibold">{date}</td>
      <td className="md:hidden font-semibold">{date.split("/2022")[0]}</td>
    </>
  );
}
