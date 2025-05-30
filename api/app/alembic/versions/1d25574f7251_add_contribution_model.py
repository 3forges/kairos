"""Add Contribution model

Revision ID: 1d25574f7251
Revises: 1a31ce608336
Create Date: 2025-05-29 08:59:42.503982

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '1d25574f7251'
down_revision = '1a31ce608336'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('contribution',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('idea_text', sqlmodel.sql.sqltypes.AutoString(length=510), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('owner_id', sa.Uuid(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('contribution')
    # ### end Alembic commands ###
