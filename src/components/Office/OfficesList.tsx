import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppMessage, ConfirmDialog, ListItem, Loader, SectionHeading } from '..';
import { AuthContext } from '../../authContext';
import { AppMessageVariant, Office } from '../../models';
import { deleteOffice, fetchAllOrgOffices, resetState, selectOfficesState } from '../../store/officesSlice';

const OfficesList: FC = () => {
  const { orgId } = useParams();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: offices, error, isLoading } = useSelector(selectOfficesState);
  const [deleteOfficeId, setDeleteOfficeId] = useState<string | null>(null);

  useEffect(() => {
    if (auth.isLoggedIn) {
      dispatch(fetchAllOrgOffices(orgId));
    }

    return () => {
      dispatch(resetState());
    };
  }, [auth.isLoggedIn, dispatch, orgId]);

  const handleDel = async (officeId: string) => {
    await dispatch(deleteOffice(officeId));
    setDeleteOfficeId(null);
    dispatch(fetchAllOrgOffices(orgId));
  };

  const renderList = () => {
    if (error) {
      return <AppMessage variant={AppMessageVariant.DANGER} text={error} />;
    }
    return offices.length ? (
      offices.map((office) => (
        <ListItem<Office>
          key={office.id}
          isAuthorized={!!auth.coworker?.coworkerEmail && office.contact.includes(auth.coworker?.coworkerEmail)}
          item={office}
          onDelete={setDeleteOfficeId}
        />
      ))
    ) : (
      <AppMessage variant={AppMessageVariant.INFO} text="No Offices available" />
    );
  };

  return (
    <section className="section__layout">
      <ConfirmDialog
        isOpen={!!deleteOfficeId}
        title="Confirm Deletion"
        text="Are you sure deleting that office?"
        onCancel={() => setDeleteOfficeId(null)}
        onConfirm={() => deleteOfficeId && handleDel(deleteOfficeId)}
      />
      <SectionHeading text="Offices List" />
      <hr className="divider" />
      <div className="flex flex-col justify-center overflow-hidden">{isLoading ? <Loader /> : renderList()}</div>
    </section>
  );
};

export default OfficesList;
