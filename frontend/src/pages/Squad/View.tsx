import { useParams } from "react-router-dom";

type Props = {};

export default function ViewSquadPage({}: Props) {
  const { id } = useParams<{ id: string }>();

  return <div>Squad {id} </div>;
}
