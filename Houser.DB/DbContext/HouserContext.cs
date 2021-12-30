using Houser.DB.Entities;
using Microsoft.EntityFrameworkCore;

#nullable disable
//Scaffold-DbContext "Server=(LocalDB)\MSSQLLocalDB;Database=Houser;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Entities -ContextDir DbContext -Context HouserContext -Project Houser.DB -StartupProject Houser.DB -Force
namespace Houser.DB
{
    public partial class HouserContext : DbContext
    {
        public HouserContext()
        {
        }

        public HouserContext( DbContextOptions<HouserContext> options )
            : base(options)
        {
        }

        public virtual DbSet<Apartment> Apartments { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring( DbContextOptionsBuilder optionsBuilder )
        {
            if ( !optionsBuilder.IsConfigured )
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(LocalDB)\\MSSQLLocalDB;Database=Houser;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Apartment>(entity =>
            {
                entity.Property(e => e.Block)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Idatetime)
                    .HasColumnType("datetime")
                    .HasColumnName("IDatetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IsEmpty)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Udatetime)
                    .HasColumnType("datetime")
                    .HasColumnName("UDatetime");

                entity.HasOne(d => d.Resident)
                    .WithMany(p => p.Apartments)
                    .HasForeignKey(d => d.ResidentId)
                    .HasConstraintName("FK_Apartments_Users");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Idatetime)
                    .HasColumnType("datetime")
                    .HasColumnName("IDatetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PayedDate).HasColumnType("datetime");

                entity.Property(e => e.PaymentDueDate).HasColumnType("date");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Udatetime)
                    .HasColumnType("datetime")
                    .HasColumnName("UDatetime");

                entity.HasOne(d => d.Payer)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.PayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Payments_Users");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.CarPlateNum)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Idatetime)
                    .HasColumnType("datetime")
                    .HasColumnName("IDatetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdentityNum)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("((11111111111.))");

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNum)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Udatetime)
                    .HasColumnType("datetime")
                    .HasColumnName("UDatetime");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial( ModelBuilder modelBuilder );
    }
}
